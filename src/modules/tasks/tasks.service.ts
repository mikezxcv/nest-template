import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ApiSrService } from '../external-api/api-sr/api-sr.service';
import { CronJob } from 'cron';
import { MailService } from '../mail/mail.service';
import { ILog } from 'src/common/interfaces/log.interface';
import { ICustomError } from 'src/common/interfaces/custom-error.interface';
import { GenerateFilesService } from './generate-files/generate-files.service';
import { PaymentRetentionWorkDto } from '../external-api/api-sr/dto/index.dto';
import { BitacoraLogsService } from '../bitacora-logs/bitacora-logs.service';
import { ApiFxService } from '../external-api/api-fx/api-fx.service';
import { ApiGdService } from '../external-api/api-gd/api-gd.service';

@Injectable()
export class TasksService implements OnModuleInit {
  private readonly logger = new Logger(TasksService.name);
  private isTaskRunning: boolean = false;

  private readonly cronExpression =
    process.env.CRON_EXPRESSION || '* * * * * *';
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private readonly apiSrService: ApiSrService,
    private readonly apiFxService: ApiFxService,
    private readonly apiGdService: ApiGdService,
    private readonly mailService: MailService,
    private readonly generateFilesService: GenerateFilesService,
    private readonly bitacoraLogsService: BitacoraLogsService,
  ) {}

  onModuleInit() {
    const job = new CronJob(this.cronExpression, async () => {
      if (!this.isTaskRunning) {
        this.isTaskRunning = true;
        await this.sendEmail();
        this.isTaskRunning = false;
      }
    });

    this.schedulerRegistry.addCronJob('weeklyCommissionReport', job);
    job.start();
  }

  async sendEmail() {
    const startDateString =
      process.env.START_DATE_RETENTION_WORK_REPORT || '01-06-2023';

    const endDate = new Date().setDate(new Date().getDate() - 1);
    const endDateString = (
      process.env.END_DATE_RETENTION_WORK_REPORT ||
      new Date(endDate).toLocaleDateString()
    ).replace(/\//g, '-');

    const resultDataSR = (await this.apiSrService.findPaymentAndRetentionOfWork(
      startDateString,
      endDateString,
    )) as PaymentRetentionWorkDto[];
    if ((resultDataSR as unknown as ICustomError).error) {
      this.logger.error('Error trying to get data from SR');
      return;
    }

    const resultDataFX = (await this.apiFxService.findPaymentAndRetentionOfWork(
      startDateString,
      endDateString,
    )) as PaymentRetentionWorkDto[];
    if ((resultDataFX as unknown as ICustomError).error) {
      this.logger.error('Error trying to get data from FX');
      return;
    }

    const resultDataGD = (await this.apiGdService.findPaymentAndRetentionOfWork(
      startDateString,
      endDateString,
    )) as PaymentRetentionWorkDto[];
    if ((resultDataGD as unknown as ICustomError).error) {
      this.logger.error('Error trying to get data from GD');
      return;
    }

    const excelBuffer =
      await this.generateFilesService.generatePaymentRetentionWorkReportExcel(
        resultDataSR,
        resultDataFX,
        resultDataGD,
      );

    const mailOptions = {
      receivers: [
        'william.vasquez@constru-services.com',
        'jeannette.flamenco@constru-services.com',
      ],
      excelBuffer: excelBuffer,
      companyNameReport: 'SALAZAR ROMERO, INVERSIONES FENIX, GLOBAL DEVELOPERS',
      dateRange: `${startDateString} al ${endDateString}`,
    };

    const sendMail = await this.mailService.sendEmailReportCommision(
      mailOptions.receivers,
      mailOptions.excelBuffer,
      mailOptions.companyNameReport,
      mailOptions.dateRange,
    );
    if (sendMail.error) {
      this.logger.error('Error trying to send email');
      return sendMail;
    }

    const customLog: ILog = {
      date: new Date().toString(),
      type: 'SUCCESS',
      status: 200,
      message: 'Cron Job sendEmail executed correctly',
      details: { email: 'sendMail', data: excelBuffer },
    };
    this.logger.debug('Cron Job sendEmail executed correctly');

    await this.bitacoraLogsService.saveLog(customLog);
    return { success: true };
  }
}

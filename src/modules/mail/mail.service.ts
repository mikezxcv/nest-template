import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ILog } from 'src/common/interfaces/log.interface';
import { SentMessageInfo } from 'nodemailer';
import * as ExcelJs from 'exceljs';
import { BitacoraLogsService } from '../bitacora-logs/bitacora-logs.service';
import { join } from 'path';

@Injectable()
export class MailService {
  private readonly companyNameSender =
    process.env.SYSTEM_COMPANY_NAME || 'Constru Services';
  constructor(
    private readonly mailerService: MailerService,
    private readonly bitacoraLogsService: BitacoraLogsService,
  ) {}

  async sendEmailReportCommision(
    receivers: string[],
    excelBuffer: ExcelJs.Buffer,
    companyNameReport: string,
    dateRange: string,
    filename: string = 'reporte' + new Date().getTime() + '.xlsx',
  ) {
    try {
      const emailContent = `Este es un correo electrónico automatizado que contiene 
       el reporte de obra y retenciones de las compañías: ${companyNameReport}. 
       Por favor, revise el archivo adjunto para obtener más detalles. Tenga en cuenta 
       que los datos incluidos en este informe son válidos en el rango de fechas: ${dateRange}.`;

      const currentYear = new Date().getFullYear();
      const sended = await this.mailerService.sendMail({
        to: receivers,
        subject: `REPORTE DE PAGO Y RETENCIÓN DE OBRA`,
        template: './base_template',
        context: {
          emailContent,
          currentYear,
          companyNameSender: this.companyNameSender,
        },
        attachments: [
          {
            filename,
            content: excelBuffer as Buffer,
            encoding: 'base64',
            contentType:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          },
          {
            filename: 'company_logo.png',
            path: join(__dirname, '../../common/mail/files/company_logo.png'),
            cid: 'companylogo',
          },
        ],
      });
      const customLog: ILog<SentMessageInfo> = {
        date: new Date().toString(),
        type: 'SUCCESS',
        status: 200,
        message: 'Correo enviado correctamente a ' + receivers.join(', ') + '.',
        details: sended,
      };
      await this.bitacoraLogsService.saveLog(customLog);

      return { success: true };
    } catch (error) {
      const customError: ILog<any> = {
        date: new Date().toString(),
        type: 'ERROR',
        status: 500,
        message: 'Error al enviar el correo de reporte de las comisiones',
        details: error,
      };
      await this.bitacoraLogsService.saveLog(customError);

      return { error: customError };
    }
  }
}

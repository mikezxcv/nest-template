import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { ILog } from 'src/common/interfaces/log.interface';
import { ICustomError } from 'src/common/interfaces/custom-error.interface';
import { BitacoraLogsService } from 'src/modules/bitacora-logs/bitacora-logs.service';
import {
  PaymentRetentionWorkDto,
  ComissionPendingAccountDto,
} from './dto/index.dto';

@Injectable()
export class ApiFxService {
  private readonly logger = new Logger(ApiFxService.name);
  private readonly baseUrl = process.env.API_FX_URL || 'http://localhost:3005';
  private readonly apiKey = process.env.API_FX_KEY || '1234567890';
  constructor(
    private readonly httpService: HttpService,
    private readonly bitacoraLogsService: BitacoraLogsService,
  ) {}

  async findComissionPendingAccounts() {
    try {
      const urlRequest =
        this.baseUrl + '/CREDITOS/cuentas/pendientes-revision-comision';
      const response = this.httpService
        .get(urlRequest, {
          params: {
            key: this.apiKey,
            sucursales: 0,
            proyectos: 0,
          },
        })
        .pipe(
          map((response) => response.data.data as ComissionPendingAccountDto[]),
        );

      return await firstValueFrom(response);
    } catch (error) {
      console.log('error', error);
      const customError: ILog = {
        date: new Date().toString(),
        type: 'ERROR',
        status: 500,
        message: 'Error en el servicio FX findComissionPendingAccounts',
        details: JSON.stringify(error),
      };
      console.log(customError);
      await this.bitacoraLogsService.saveLog(customError);
      return { error: customError } as ICustomError;
    }
  }

  async findPaymentAndRetentionOfWork(startDate: string, endDate: string) {
    try {
      this.logger.debug('INVERSIONES FENIX findPaymentAndRetentionOfWork');

      const urlRequest = this.baseUrl + '/RRHH/reporte-mano-obra/completo';
      const response = this.httpService
        .get(urlRequest, {
          params: {
            key: this.apiKey,
            sucursales: 0,
            proyectos: 0,
            fechaInicio: startDate,
            fechaFin: endDate,
            soloRetencion: 0,
          },
        })
        .pipe(
          map((response) => response.data.data as PaymentRetentionWorkDto[]),
        );

      return await firstValueFrom(response);
    } catch (error) {
      const customError: ILog = {
        date: new Date().toString(),
        type: 'ERROR',
        status: 500,
        message: 'Error en el servicio FX findPaymentAndRetentionOfWork',
        details: JSON.stringify(error),
      };
      console.log(customError);
      await this.bitacoraLogsService.saveLog(customError);
      return { error: customError } as ICustomError;
    }
  }
}

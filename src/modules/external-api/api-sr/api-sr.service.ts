import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { ILog } from 'src/common/interfaces/log.interface';
import {
  ComissionPendingAccountDto,
  PaymentRetentionWorkDto,
} from './dto/index.dto';
import { ICustomError } from 'src/common/interfaces/custom-error.interface';
import { BitacoraLogsService } from 'src/modules/bitacora-logs/bitacora-logs.service';

@Injectable()
export class ApiSrService {
  private readonly baseUrl = process.env.API_SR_URL || 'http://localhost:3001';
  private readonly apiKey = process.env.API_SR_KEY || '1234567890';
  private readonly logger = new Logger(ApiSrService.name);
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
      const customError: ILog = {
        date: new Date().toString(),
        type: 'ERROR',
        status: 500,
        message: 'Error en el servicio SR findComissionPendingAccounts',
        details: JSON.stringify(error),
      };
      console.log(customError);
      await this.bitacoraLogsService.saveLog(customError);
      return { error: customError } as ICustomError;
    }
  }

  async findPaymentAndRetentionOfWork(startDate: string, endDate: string) {
    try {
      this.logger.debug('SALAZAR ROMERO findPaymentAndRetentionOfWork');

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
        message: 'Error en el servicio SR findPaymentAndRetentionOfWork',
        details: JSON.stringify(error),
      };
      console.log(customError);
      await this.bitacoraLogsService.saveLog(customError);
      return { error: customError } as ICustomError;
    }
  }
}

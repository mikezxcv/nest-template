import * as ExcelJS from 'exceljs';
import { Injectable } from '@nestjs/common';
import { PaymentRetentionWorkDto } from 'src/modules/external-api/api-sr/dto/index.dto';

@Injectable()
export class GenerateFilesService {
  async generatePaymentRetentionWorkReportExcel(
    dataSR: PaymentRetentionWorkDto[],
    dataFX: PaymentRetentionWorkDto[],
    dataGD: PaymentRetentionWorkDto[],
  ): Promise<ExcelJS.Buffer> {
    const fieldMapping: Record<string, string> = {
      nombreEmpresa: 'Empresa',
      nombreSucursal: 'Sucursal',
      nombreProyecto: 'Proyecto',
      fechaODT: 'Fecha ODT',
      fechaPlanilla: 'Fecha de planilla',
      fechaDesde: 'Planilla desde',
      fechaHasta: 'Planilla hasta',
      correlativo: 'Correlativo de planilla',
      descripcionPlanilla: 'Descripción de planilla',
      numeroLinea: 'Número de línea',
      numeroODT: 'Número de ODT',
      codempleado: 'Código de empleado',
      nombreEmpleado: 'Nombre de empleado',
      planilla: 'Planilla',
      anio: 'Año',
      descripcionLinea: 'Descripción de línea',
      cantidad: 'Cantidad',
      precio: 'Precio',
      subtotalRedondeado: 'Subtotal redondeado',
      subtotal: 'Subtotal',
      poligono: 'Polígono',
      lote: 'Lote',
      casa: 'Casa',
      codobra: 'Código de obra',
      montoRetenido: 'Monto retenido',
      unidadMedida: 'Unidad de medida',
    };

    const workbook = new ExcelJS.Workbook();
    this.generateWorkSheet('SALAZAR_ROMERO', fieldMapping, workbook, dataSR);
    this.generateWorkSheet('INVERSIONES_FENIX', fieldMapping, workbook, dataFX);
    this.generateWorkSheet('GLOBAL_DEVELOPERS', fieldMapping, workbook, dataGD);
    return await workbook.xlsx.writeBuffer();
  }

  private generateWorkSheet(
    name: string,
    fieldMapping: Record<string, string>,
    workBook: ExcelJS.Workbook,
    data: PaymentRetentionWorkDto[],
  ) {
    const worksheet = workBook.addWorksheet(name);

    const headers = Object.keys(fieldMapping).map((field) => {
      return fieldMapping[field];
    });
    const headerRow = worksheet.addRow(headers);
    headerRow.font = { bold: true };

    const datesFields = [
      'fechaODT',
      'fechaPlanilla',
      'fechaDesde',
      'fechaHasta',
    ];
    data.forEach((rowData) => {
      const selectedData = Object.keys(fieldMapping).map((field) => {
        const data = rowData[field];
        return datesFields.includes(field) &&
          data &&
          typeof data === 'string' &&
          data.includes('T')
          ? this.convertDateToString(new Date(data))
          : data;
      });
      worksheet.addRow(selectedData);
    });
    const columnWidths: number[] = new Array(headers.length).fill(0);

    headers.forEach((header, index) => {
      if (header.length > columnWidths[index]) {
        columnWidths[index] = header.length;
      }
    });

    data.forEach((rowData) => {
      Object.keys(fieldMapping).forEach((field, index) => {
        const cellData = String(rowData[field]);
        if (cellData.length > columnWidths[index]) {
          columnWidths[index] = cellData.length;
        }
      });
    });

    columnWidths.forEach((width, index) => {
      worksheet.getColumn(index + 1).width = width + 2;
    });

    return worksheet;
  }

  private convertDateToString(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

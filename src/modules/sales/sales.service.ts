import { Injectable, NotFoundException } from '@nestjs/common';
import { InvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { InvoiceDetail } from './entities/invoice_detail.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,

    @InjectRepository(InvoiceDetail)
    private invoiceDetailRepository: Repository<InvoiceDetail>,
  ) {}

  async create(createSaleDto: InvoiceDto) {
    let total = 0;
    createSaleDto.details.map((detail) => {
      total += detail.unit_price * detail.quantity;
    });
    const invoice = this.invoiceRepository.create({
      date: new Date(),
      client: createSaleDto.client,
      total: total,
    });
    await this.invoiceRepository.save(invoice);
    const invoiceDetail = this.invoiceDetailRepository.create(
      createSaleDto.details.map((item) => ({
        ...item,
        invoiceId: invoice.id,
      })),
    );

    await this.invoiceDetailRepository.save(invoiceDetail);
    // Define el procedimiento almacenado y los parámetros
    // const procedure = 'CALL InsertInvoice(?, ?, ?)';
    // const parameters = [createSaleDto.client, total, JSON.stringify(createSaleDto.details)];

    // // Ejecuta el procedimiento almacenado utilizando query
    // const result = await this.invoiceRepository.query(procedure, parameters);
    // console.log(result);

    return this.invoiceRepository.findOne({
      where: { id: invoice.id },
      relations: ['details'],
    });
  }

  async findAll() {
    return await this.invoiceRepository.find({
      relations: ['details'],
    });
  }

  async findOne(id: number) {
    const invoice = await this.invoiceRepository.findOne({
      where: { id },
      relations: ['details'],
    });
    if (!invoice)
      throw new NotFoundException(
        'The Invoice With id ' + id + ' Was Not Found',
      );
    return invoice;
  }

  async update(id: number, updateSaleDto: UpdateInvoiceDto) {
    const invoice = await this.invoiceRepository.findOne({
      where: { id },
      relations: ['details'],
    });

    if (!invoice)
      throw new NotFoundException(
        'The Invoice With id ' + id + ' Was Not Found',
      );

    const invoiceUpdated = await this.invoiceRepository.save({
      ...invoice,
      ...updateSaleDto,
    });

    console.log(updateSaleDto.details);
    const detailsToUdate: InvoiceDetail[] = [];
    updateSaleDto.details.map(
      async (item) => (
        console.log(
          InvoiceDetail.create({
            ...item,
          }),
        ),
        detailsToUdate.push(
          InvoiceDetail.create({
            ...item,
            invoiceId: id,
          }),
        )
      ),
    );

    console.log(detailsToUdate);
    await this.invoiceDetailRepository.save(detailsToUdate);

    let total = 0;
    const updated = await this.invoiceRepository.findOne({
      where: { id },
      relations: ['details'],
    });
    updated.details.map((detail) => {
      total += detail.unit_price * detail.quantity;
    });
    updated.total = total;
    return await this.invoiceRepository.save(updated);
  }

  async remove(id: number) {
    const details = await this.invoiceDetailRepository.findBy({
      invoiceId: id,
    });
    details.map(async (x) => await this.invoiceDetailRepository.delete(x.id));
    await this.invoiceRepository.delete(id);
  }
}

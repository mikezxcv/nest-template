import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';  
import { InvoiceDetail } from './entities/invoice_detail.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Invoice, InvoiceDetail])],
  controllers: [SalesController],
  providers: [SalesService]
})
export class SalesModule {}

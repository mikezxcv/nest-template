import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { InvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createSaleDto: InvoiceDto) {
    return this.salesService.create(createSaleDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.salesService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateInvoiceDto) {
    return this.salesService.update(+id, updateSaleDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.remove(+id);
  }
}

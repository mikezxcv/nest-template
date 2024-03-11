import { ApiProperty } from '@nestjs/swagger';

class InvoiceDetailDto {


    @ApiProperty()
    product: string;

    @ApiProperty()
    quantity: number;

    @ApiProperty({ type: 'number' })
    unit_price: number;

    @ApiProperty()
    invoiceId: number;
}

export class InvoiceDto {



    @ApiProperty()
    client: string;


    @ApiProperty({ type: [InvoiceDetailDto] })
    details: InvoiceDetailDto[];
}
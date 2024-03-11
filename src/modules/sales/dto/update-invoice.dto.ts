import { ApiProperty } from '@nestjs/swagger';

class UpdateInvoiceDetailDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    product: string;

    @ApiProperty()
    quantity: number;

    @ApiProperty({ type: 'number' })
    unit_price: number;

}

export class UpdateInvoiceDto {



    @ApiProperty()
    client: string;


    @ApiProperty({ type: [UpdateInvoiceDetailDto] })
    details: UpdateInvoiceDetailDto[];
}
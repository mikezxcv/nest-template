import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Invoice } from './invoice.entity'; // Asegúrate de tener la entidad Invoice definida


@Entity({ name: 'invoice_detail' })
export class InvoiceDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', length: 100 })
  product: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'float' })
  unit_price: number;

  @Column()
  invoiceId: number;

  @ManyToOne(() => Invoice, invoice => invoice.details)
  @JoinColumn({ name: 'invoiceId' })
  invoice: Invoice;
}

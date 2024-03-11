import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { InvoiceDetail } from './invoice_detail.entity';

@Entity({ name: 'invoice' })
export class Invoice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'nvarchar', length: 100 })
  client: string;

  @Column({type:'float'})
  total: number;

  @OneToMany(() => InvoiceDetail, invoiceDetail => invoiceDetail.invoice)
  @JoinColumn()
  details: InvoiceDetail[];
}
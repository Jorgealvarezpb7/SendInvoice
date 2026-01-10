import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';

import { Invoice } from './Invoice';

import type { Relation } from 'typeorm';

export interface IInvoiceItem {
  id: string;
  amount: number;
  description: string;
  quantity: number;
  unitPrice: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

@Entity({
  name: 'invoice_item'
})
export class InvoiceItem implements IInvoiceItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float')
  amount: number;

  @Column()
  description: string;

  @Column('int')
  quantity: number;

  @Column('float')
  unitPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Invoice, (invoice) => invoice.items)
  invoice: Relation<Invoice>;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}

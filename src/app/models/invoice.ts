import { Customer } from './customer';
import { StatusInvoice } from './status-invoice';

export interface Invoice {
  id: number;
  data: string;
  number: number;
  year: number;
  importo: number;
  status: StatusInvoice;
  customer: Customer;
}

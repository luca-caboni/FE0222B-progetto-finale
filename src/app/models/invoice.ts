import { Customer } from "./customer";

export class Invoice {
  id!: number;
  data!: string;
  number!: number;
  year!: number;
  amount!: number;
  status!: {
    id: number;
    name: string;
  };
  customer: Customer = new Customer()
}

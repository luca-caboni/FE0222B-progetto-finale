import { Customer } from "./customer";

export interface Invoice {
  anno: number;
  cliente: any;
  data: string;
  id: number;
  importo: number;
  numero: number;
  stato: {
    id: number;
    nome: string;
  }
}

import { Site } from "./geo-data";

export class Customer {
  id!: number;
 ragioneSociale!: string;
  partitaIva!: number;
  tipoCliente!: string;
  email!: string;
  pec!: string;
  telefono!: number;
  nomeContatto!: string;
  cognomeContatto!: string;
  telefonoContatto!: number;
  emailContatto!: string;

  indirizzoSedeOperativa: Site = new Site()
  indirizzoSedeLegale: Site = new Site()
}

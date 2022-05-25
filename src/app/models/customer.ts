import { Site } from "./geo-data";

export class Customer {
  id!: number;
  businessName!: string;
  ivaNumber!: number;
  typeCustomer!: string;
  email!: string;
  pec!: string;
  cellular!: number;
  nameContact!: string;
  lastnameContact!: string;
  cellularContact!: number;
  emailContact!: string;

  addressOperationalSite: Site = new Site()
  addressLegalSite: Site = new Site()
}

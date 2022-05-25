export class Province {
  id!:number;
  name!:string;
  abbr!:string;
}

export class City {
  id!: number;
  name!: string;
  province: Province = new Province();
}

export class Site {
  id!: number;
  via!: string;
  civic!: number;
  cap!: number;
  location!: string;
  city: City = new City();
}

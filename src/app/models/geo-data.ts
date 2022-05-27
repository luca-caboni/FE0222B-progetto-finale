export class Province {
  id!:number;
  nome!:string;
  sigla!:string;
}

export class City {
  id!: number;
  nome!: string;
  provincia: Province = new Province();
}

export class Site {
  id!: number;
  via!: string;
  civico!: number;
  cap!: number;
  localita!: string;
  comune: City = new City();
}

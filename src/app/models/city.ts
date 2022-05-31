import { Provincia } from "./province";

export interface Comune {
  id: number;
  nome: string;
  provincia: Provincia;
}

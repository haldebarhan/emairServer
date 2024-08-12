import { Denree } from "src/schemas/denree.schema";

export interface IAppro {
  date: Date;
  magasin: string;
  produits: { denree: Denree; quantite: number, denreeId: string}[];
}

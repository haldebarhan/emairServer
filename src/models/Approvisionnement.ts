export interface IAppro {
  date: Date;
  magasin: string;
  produits: { denree: string; quantite: number,  denreeName: string}[];
}

export class CreateApproDto {
  date: Date;
  magasin: string;
  produits: { denreeId: string; quantite: number, denreeName: string }[];
}

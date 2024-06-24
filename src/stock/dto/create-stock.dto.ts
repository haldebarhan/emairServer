export class CreateStockDto {
  magasin: string; // ID du magasin
  denrees: { denree: string; qteInitial: number }[]; // Liste des IDs des denrées et leur stock initial
}
export class CreateStockDto {
  magasin: string;
  denrees: { denree: string; qteInitial: number }[];
}

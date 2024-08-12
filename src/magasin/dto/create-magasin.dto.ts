export class CreateMagasinDto {
  date: Date;
  stock?: {
    denree: string;
    quantite?: number;
    conso?: number;
    appro?: number;
    balance?: number;
  }[];
}

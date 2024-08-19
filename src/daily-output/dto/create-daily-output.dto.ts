export class CreateDailyOutputDto {
  reportId: string;
  magasin: string
  date: Date;
  pdej: string;
  dej: string;
  hd: string;
  des: string;
  din: string;
  pdej_effect: number;
  dej_effect: number;
  din_effect: number;
  sorties: {
    produit: string;
    matin: number;
    soir: number;
    unite: string;
  }[];
}

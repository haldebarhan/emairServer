export class CreateOutingBookletDto {
  date: Date;
  
  magasin: string;

  total_matin: number;

  total_midi: number;

  total_soir: number;

  carnet: {
    produit: string;
    conso: number;
    appro: number;
    existant: number;
  }[];
}

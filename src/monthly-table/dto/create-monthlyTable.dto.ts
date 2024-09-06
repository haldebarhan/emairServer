import { Menu } from 'src/models/Menu';

export class CreateMonthlyTableDto {
  magasin: string;
  unites: {
    nom: string;
    matin: Array<number>;
    midi: Array<number>;
    soir: Array<number>;
    totalMatin: number;
    totalMidi: number;
    totalSoir: number;
  }[];

  totalMatin: Array<number>;
  totalMidi: Array<number>;
  totalSoir: Array<number>;
  totalRow: Array<number>;
  menus: Array<Partial<Menu>>;
}

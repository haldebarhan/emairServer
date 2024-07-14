export class UpdateConsommationDto {
  date?: Date;
  menu?: string;
  magasin?: string;
  report?: {
    unite: string;
    petit_dejeuner: number;
    dejeuner: number;
    diner: number;
  }[];

  transmit?: boolean;
}

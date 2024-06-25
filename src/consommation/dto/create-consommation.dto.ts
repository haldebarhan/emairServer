export class CreateConsommationDto {
  date: string;
  menu: string;
  report: {
    unite: string;
    petit_dejeuner: Number;
    dejeuner: Number;
    diner: Number;
  }[];
}

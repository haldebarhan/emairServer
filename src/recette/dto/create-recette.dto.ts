export class CreateRecetteDto {
  nomRecette: string;
  ingredients: { denree: string; ration: number }[];
}

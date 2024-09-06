export class CreateRecetteDto {
  nomRecette: string;
  ingredients: { denree: string; ration: number; unite: string }[];
  type: string;
}

export class UpdateRecetteDto {
    nomRecette?: string;
    ingredients?: { denree: string; ration: number; unite: string }[];
  }
  
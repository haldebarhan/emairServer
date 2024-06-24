import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Denree } from './denree.schema';

export type RecetteDocument = mongoose.HydratedDocument<Recette>;

@Schema()
export class Recette {
  @Prop()
  nomRecette: string;

  @Prop([
    {
      denree: { type: mongoose.Schema.Types.ObjectId, ref: 'Denree' },
      ration: { type: Number },
    },
  ])
  ingredients: { denree: Denree; ration: Number }[];
}

export const RecetteSchema = SchemaFactory.createForClass(Recette);

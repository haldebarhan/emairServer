import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MagasinDocument = HydratedDocument<Magasin>;

@Schema()
export class Magasin {
  @Prop()
  mois: string;

  @Prop()
  annee: string;
}

export const MagasinSchema = SchemaFactory.createForClass(Magasin);

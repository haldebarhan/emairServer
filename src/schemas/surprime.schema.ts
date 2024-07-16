import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type SurprimeDocument = mongoose.HydratedDocument<Surprime>;

@Schema()
export class Surprime {
  @Prop({ type: Date })
  date: Date;

  @Prop({ type: String, unique: true })
  nom: string;

  @Prop({ type: Number })
  montant: number;
}

export const SurprimeSchema = SchemaFactory.createForClass(Surprime);

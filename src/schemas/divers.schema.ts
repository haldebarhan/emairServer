import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type DiversDocument = mongoose.HydratedDocument<Divers>;

@Schema()
export class Divers {
  @Prop({ type: String })
  libelle: string;

  @Prop({ type: Number })
  montant: number;

  @Prop({ type: Date })
  date: Date;
}

export const DiversSchema = SchemaFactory.createForClass(Divers);

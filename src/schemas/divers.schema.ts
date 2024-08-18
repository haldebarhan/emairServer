import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Magasin } from './magasin.schema';

export type DiversDocument = mongoose.HydratedDocument<Divers>;

@Schema()
export class Divers {
  @Prop({ type: String })
  libelle: string;

  @Prop({ type: Number })
  montant: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Magasin' })
  magasin: Magasin;
}

export const DiversSchema = SchemaFactory.createForClass(Divers);

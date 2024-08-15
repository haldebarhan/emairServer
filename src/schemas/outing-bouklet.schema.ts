import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Magasin } from './magasin.schema';

export type OutingBookletDocument = mongoose.HydratedDocument<OutingBooklet>;

@Schema()
export class OutingBooklet {
  @Prop({ type: Date, unique: true })
  date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Magasin' })
  magasin: Magasin;

  @Prop({ type: Number })
  total_matin: number;

  @Prop({ type: Number })
  total_midi: number;

  @Prop({ type: Number })
  total_soir: number;

  @Prop([
    {
      produit: { type: String },
      conso: { type: Number },
      appro: { type: Number },
      existant: { type: Number, default: 0 },
    },
  ])
  carnet: {
    produit: string;
    conso: number;
    appro: number;
    existant: number;
  }[];
}

export const OutingBookletSchema = SchemaFactory.createForClass(OutingBooklet);

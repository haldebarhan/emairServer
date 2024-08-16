import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Magasin } from './magasin.schema';

export type OutingBookletDocument = mongoose.HydratedDocument<OutingBooklet>;

@Schema()
export class OutingBooklet {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Magasin' })
  magasin: Magasin;

  @Prop({ type: Array<Number> })
  total_matin: number[];

  @Prop({ type: Array<Number> })
  total_midi: number[];

  @Prop({ type: Array<Number> })
  total_soir: number[];

  @Prop([
    {
      produit: { type: String },
      appro: { type: Array<Number> },
      conso: { type: Array<Number> },
      balance: { type: Array<Number> },
      existant: { type: Number, default: 0 },
    },
  ])
  carnet: {
    produit: string;
    appro: Array<number>;
    conso: Array<number>;
    balance: Array<number>;
    existant: number;
  }[];
}

export const OutingBookletSchema = SchemaFactory.createForClass(OutingBooklet);

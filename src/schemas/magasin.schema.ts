import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Denree } from './denree.schema';

export type MagasinDocument = HydratedDocument<Magasin>;

@Schema()
export class Magasin {
  @Prop({ type: Date })
  date: Date;

  @Prop([
    {
      denree: { type: mongoose.Schema.Types.ObjectId, ref: 'Denree' },
      quantite: { type: Number, default: 0 },
      conso: { type: Number, default: 0 },
      appro: { type: Number, default: 0 },
      balance: { type: Number, default: 0 },
    },
  ])
  stock: {
    denree: Denree;
    quantite: number;
    conso: number;
    appro: number;
    balance: number;
  }[];

  @Prop({ type: Boolean, default: false })
  complete: Boolean;
}

export const MagasinSchema = SchemaFactory.createForClass(Magasin);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Denree } from './denree.schema';
import { Magasin } from './magasin.schema';

export type MesureDocument = mongoose.HydratedDocument<Stock>;

@Schema()
export class Stock {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Magasin' })
  magasin: Magasin;
  @Prop([
    {
      denree: { type: mongoose.Types.ObjectId, ref: 'Denree', required: true },
      qteInitial: { type: Number, required: true },
    },
  ])
  denrees: { denree: Denree; qteInitial: Number }[];
}

export const StockSchema = SchemaFactory.createForClass(Stock);

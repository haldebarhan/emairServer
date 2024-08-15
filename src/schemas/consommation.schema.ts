import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Menu } from './menu.schema';
import { Magasin } from './magasin.schema';

export type ConsommationDocument = mongoose.HydratedDocument<Consommation>;

@Schema()
export class Consommation {
  @Prop({ type: Date, unique: true })
  date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' })
  menu: Menu;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Magasin' })
  magasin: Magasin;

  @Prop({ type: Number })
  total_matin: number;

  @Prop({ type: Number })
  total_midi: number;

  @Prop({ type: Number })
  total_soir: number;
}

export const ConsommationSchema = SchemaFactory.createForClass(Consommation);

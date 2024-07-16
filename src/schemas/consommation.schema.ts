import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Menu } from './menu.schema';
import { Unite } from './unite.schema';

export type ConsommationDocument = mongoose.HydratedDocument<Consommation>;

@Schema()
export class Consommation {
  @Prop({ type: Date, unique: true })
  date: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' })
  menu: Menu;
  @Prop([
    {
      unite: { type: mongoose.Schema.Types.ObjectId, ref: 'Unite' },
      petit_dejeuner: { type: Number, default: 0 },
      dejeuner: { type: Number, default: 0 },
      diner: { type: Number, default: 0 },
    },
  ])
  report: {
    unite: Unite;
    petit_dejeuner: number;
    dejeuner: number;
    diner: number;
  }[];

  @Prop({ type: Boolean, default: false })
  transmit: boolean;
}

export const ConsommationSchema = SchemaFactory.createForClass(Consommation);

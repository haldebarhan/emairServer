import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Magasin } from './magasin.schema';

export type MonthlyTableDocument = mongoose.HydratedDocument<MonthlyTable>;

@Schema()
export class MonthlyTable {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Magasin' })
  magasin: Magasin;
  @Prop([
    {
      nom: { type: String },
      matin: { type: Array<Number> },
      midi: { type: Array<Number> },
      soir: { type: Array<Number> },
      totalMatin: { type: Number },
      totalMidi: { type: Number },
      totalSoir: { type: Number },
    },
  ])
  unites: {
    nom: string;
    matin: Array<number>;
    midi: Array<number>;
    soir: Array<number>;
    totalMatin: number;
    totalMidi: number;
    totalSoir: number;
  }[];

  @Prop({ type: Array<Number> })
  totalMatin: number[];

  @Prop({ type: Array<Number> })
  totalMidi: number[];

  @Prop({ type: Array<Number> })
  totalSoir: number[];

  @Prop({ type: Array<Number> })
  totalRow: number[];
}

export const MonthlyTableSchema = SchemaFactory.createForClass(MonthlyTable);

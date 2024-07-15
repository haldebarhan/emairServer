import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Consommation } from './consommation.schema';

export type DailyOutputDocument = mongoose.HydratedDocument<DaiLyOutput>;
@Schema()
export class DaiLyOutput {
  @Prop({
    unique: true,
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consommation',
  })
  reportId: Consommation;
  @Prop({ type: Date })
  date: Date;
  @Prop({ type: String, required: true })
  pdej: string;
  @Prop({ type: String, required: true })
  dej: string;
  @Prop({ type: String, required: true })
  hd: string;
  @Prop({ type: String, required: true })
  des: string;
  @Prop({ type: String, required: true })
  din: string;
  @Prop({ type: Number })
  pdej_effect: number;
  @Prop({ type: Number })
  dej_effect: number;
  @Prop({ type: Number })
  din_effect: number;
  @Prop({
    produit: { type: String },
    matin: { type: Number },
    soir: { type: Number },
    unite: { type: String },
  })
  sorties: {
    produit: string;
    matin: number;
    soir: number;
    unite: string;
  }[];
}

export const DaiLyOutputSchema = SchemaFactory.createForClass(DaiLyOutput);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Mesure } from './mesure.schema';
import { ConversionUnit } from './conversion-unit.schema';

export type DenreeDocument = mongoose.HydratedDocument<Denree>;

@Schema()
export class Denree {
  @Prop({ unique: true, required: true })
  produit: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ConversionUnit',
    required: true,
  })
  uc: ConversionUnit;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Mesure' })
  mesure: Mesure;
  @Prop({ required: true, type: Number })
  equivalence: number;
  @Prop({ type: String, required: true })
  valeur: string;
  @Prop({ type: Number, required: true })
  pu: number;
}

export const DenreeSchema = SchemaFactory.createForClass(Denree);

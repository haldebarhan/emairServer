import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Mesure } from './mesure.schema';
import { ConversionUnit } from './conversion-unit.schema';

export type DenreeDocument = mongoose.HydratedDocument<Denree>;

@Schema()
export class Denree {
  @Prop({ unique: true, required: true })
  produit: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Mesure' })
  mesure: Mesure;
  @Prop({ type: Number, required: true })
  pu: number;
}

export const DenreeSchema = SchemaFactory.createForClass(Denree);

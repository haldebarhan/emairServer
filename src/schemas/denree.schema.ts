import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Mesure } from './mesure.schema';

export type DenreeDocument = mongoose.HydratedDocument<Denree>;

@Schema()
export class Denree {
  @Prop()
  produit: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mesure' }] })
  mesure: Mesure;
}

export const DenreeSchema = SchemaFactory.createForClass(Denree);

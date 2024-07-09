import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ConversionUnitDocument = mongoose.HydratedDocument<ConversionUnit>;
@Schema()
export class ConversionUnit {
  @Prop({ unique: true, required: true })
  conversion: string;
}

export const ConversionUnitSchema =
  SchemaFactory.createForClass(ConversionUnit);

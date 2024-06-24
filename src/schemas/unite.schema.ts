import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UniteDocument = mongoose.HydratedDocument<Unite>;

@Schema()
export class Unite {
  @Prop()
  nom: string;
}

export const UniteSchema = SchemaFactory.createForClass(Unite);

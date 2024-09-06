import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type RecetteTypeDocument = mongoose.HydratedDocument<RecetteType>;

@Schema()
export class RecetteType {
  @Prop({ unique: true, required: true })
  libelle: string;
}

export const RecetteTypeSchema = SchemaFactory.createForClass(RecetteType);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MesureDocument = HydratedDocument<Mesure>;

@Schema()
export class Mesure {
  @Prop()
  unite: string;
}

export const MesureSchema = SchemaFactory.createForClass(Mesure);

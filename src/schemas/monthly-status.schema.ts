import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MonthlyStatusDocument = HydratedDocument<MonthlyStatus>;

@Schema()
export class MonthlyStatus {
  @Prop({ type: Date, unique: true })
  date: Date;
}

export const MonthlyStatusSchema = SchemaFactory.createForClass(MonthlyStatus);

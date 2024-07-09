import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Recette } from './recette.schema';

export type MenuDocument = mongoose.HydratedDocument<Menu>;

@Schema()
export class Menu {
  @Prop({type: String, unique: true, required: true})
  jour: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Recette' })
  petit_dejeuner: Recette;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Recette' })
  hors_doeuvre: Recette;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Recette' })
  dejeuner: Recette;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Recette' })
  dessert: Recette;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Recette' })
  diner: Recette;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Magasin } from './magasin.schema';
import { Denree } from './denree.schema';

export type ApprovisionnementDocument =
  mongoose.HydratedDocument<Approvisionnement>;
@Schema()
export class Approvisionnement {
  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Magasin' })
  magasin: Magasin;

  @Prop({
    denree: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Denree',
      required: true,
    },
    quantite: { type: Number, required: true },
    denreeName: { type: String, required: true },
  })
  produits: { denree: Denree; quantite: Number; denreeName: String }[];
}

export const ApproSchema = SchemaFactory.createForClass(Approvisionnement);

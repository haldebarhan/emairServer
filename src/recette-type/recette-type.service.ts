import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecetteType } from 'src/schemas/recette-type.schema';

@Injectable()
export class RecetteTypeService {
  constructor(
    @InjectModel(RecetteType.name) private rt_model: Model<RecetteType>,
  ) {}

  async getAll() {
    const query = await this.rt_model.find();
    return query;
  }
}

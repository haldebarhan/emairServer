import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConversionUnit } from 'src/schemas/conversion-unit.schema';

@Injectable()
export class ConversionUnitService {
  constructor(
    @InjectModel(ConversionUnit.name)
    private readonly ConversionUnitModel: Model<ConversionUnit>,
  ) {}

  async create(data: { conversion: string}) {
    const query = new this.ConversionUnitModel(data);
    return query.save();
  }

  async findAll() {
    const query = this.ConversionUnitModel.find().exec();
    return query;
  }
}

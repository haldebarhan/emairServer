import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Surprime } from 'src/schemas/surprime.schema';
import { CreateSurprimeDto } from './dto/create-surprime.dto';
import { UpdateSurprimeDto } from './dto/update-surprime.dto';

@Injectable()
export class SurprimeService {
  constructor(
    @InjectModel(Surprime.name) private surprimeModel: Model<Surprime>,
  ) {}

  async create(data: CreateSurprimeDto) {
    const query = new this.surprimeModel(data);
    return query.save();
  }

  async update(id: string, data: UpdateSurprimeDto) {
    const query = await this.surprimeModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return query;
  }

  async filterByDate(month: number, year: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);
    const query = this.surprimeModel
      .find({
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .exec();

    return query;
  }

  async getOne(id: string) {
    const query = this.surprimeModel.findById(id).exec();
    return query;
  }

  async delete(id: string) {
    return this.surprimeModel.findByIdAndDelete(id);
  }
}

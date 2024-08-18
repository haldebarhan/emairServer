import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Divers } from 'src/schemas/divers.schema';
import { CreateDiversDto } from './dto/create-divers.dto';
import { UpdateDiversDto } from './dto/update-divers.dto';

@Injectable()
export class DiversService {
  constructor(@InjectModel(Divers.name) private diversModel: Model<Divers>) {}

  async create(data: CreateDiversDto) {
    const query = new this.diversModel(data);
    return query.save();
  }

  async update(id: string, data: UpdateDiversDto) {
    const query = await this.diversModel
      .findByIdAndUpdate(id, data, {
        new: true,
      })
      .exec();
    return query;
  }

  async getOne(id: string) {
    const query = await this.diversModel.findById(id).exec();
    return query;
  }

  async findAll() {
    const query = await this.diversModel.find().exec();
    return query;
  }

  async delete(id: string) {
    return this.diversModel.findByIdAndDelete(id).exec();
  }

  async filter(magasinId: string) {
    const query = this.diversModel.find({magasin: magasinId}).exec()
    return query;
  }
}

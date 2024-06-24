import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mesure } from 'src/schemas/mesure.schema';
import { CreateMesureDto } from './dto/create-mesure.dto';

@Injectable()
export class MesureService {
  constructor(@InjectModel(Mesure.name) private mesureModel: Model<Mesure>) {}

  async create(createMesreDto: CreateMesureDto): Promise<Mesure> {
    const createMesure = new this.mesureModel(createMesreDto);
    return createMesure.save();
  }

  async findById(id: string) {
    const query = await this.mesureModel.findById(id).exec();
    return query;
  }

  async findAll() {
    return this.mesureModel.find().exec();
  }
}

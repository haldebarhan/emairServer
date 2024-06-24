import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Denree } from 'src/schemas/denree.schema';
import { CreateDenreeDto } from './dto/createDenree.dto';

@Injectable()
export class DenreeService {
  constructor(
    @InjectModel(Denree.name) private readonly denreeModel: Model<Denree>,
  ) {}

  async create(createDenreeDto: CreateDenreeDto) {
    const denreeModel = new this.denreeModel(createDenreeDto);
    return denreeModel.save();
  }

  async findAll() {
    const query = await this.denreeModel.find().populate('mesure').exec();
    return query;
  }

  async findOne(id: string) {
    const query = await this.denreeModel.findById(id).exec();
    return query;
  }
}

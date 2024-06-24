import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Unite } from 'src/schemas/unite.schema';
import { CreateUniteDto } from './dto/create-unite.dto';

@Injectable()
export class UniteService {
  constructor(
    @InjectModel(Unite.name) private readonly uniteModel: Model<Unite>,
  ) {}

  async create(createUniteDto: CreateUniteDto) {
    const createUnite = new this.uniteModel(createUniteDto);
    return createUnite.save();
  }

  async findAll() {
    return this.uniteModel.find().exec();
  }

  async findOne(id: string) {
    const unite = this.uniteModel.findById(id).exec();
    return unite;
  }
}

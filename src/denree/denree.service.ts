import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Denree } from 'src/schemas/denree.schema';
import { CreateDenreeDto } from './dto/createDenree.dto';

@Injectable()
export class DenreeService {
  constructor(
    @InjectModel('Denree') private readonly denreeModel: Model<Denree>,
  ) {}

  async create(createDenreeDto: CreateDenreeDto): Promise<Denree> {
    const denreeModel = new this.denreeModel(createDenreeDto);
    return denreeModel.save();
  }

  async findAll(): Promise<Denree[]> {
    return this.denreeModel.find().populate('mesure').exec();
  }
}

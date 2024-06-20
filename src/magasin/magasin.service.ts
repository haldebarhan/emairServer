import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Magasin } from 'src/schemas/magasin.schema';
import { CreateMagasinDto } from './dto/create-magasin.dto';

@Injectable()
export class MagasinService {
  constructor(@InjectModel('Magasin') private MagModel: Model<Magasin>) {}

  async create(createMagasinDto: CreateMagasinDto): Promise<Magasin> {
    const createMag = new this.MagModel(createMagasinDto);
    return createMag.save();
  }

  async findAll(): Promise<Magasin[]> {
    return this.MagModel.find().exec();
  }
}

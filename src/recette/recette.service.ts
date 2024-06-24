import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recette } from 'src/schemas/recette.schema';
import { CreateRecetteDto } from './dto/create-recette.dto';

@Injectable()
export class RecetteService {
  constructor(
    @InjectModel(Recette.name) private readonly recetteModel: Model<Recette>,
  ) {}

  async createRecette(createRecetteDto: CreateRecetteDto) {
    const createRecette = new this.recetteModel(createRecetteDto);
    return createRecette.save();
  }

  async findAllRecette() {
    const query = this.recetteModel.find().exec();
    return query;
  }

  async findOneRecette(recetteId: string) {
    const query = this.recetteModel.findById(recetteId).exec();
    return query;
  }
}

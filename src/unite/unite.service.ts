import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Unite } from 'src/schemas/unite.schema';
import { CreateUniteDto } from './dto/create-unite.dto';
import { UpdateUniteDto } from './dto/update-unite.dto';

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
    return this.uniteModel.find().sort('nom').exec();
  }

  async findOne(id: string) {
    const unite = this.uniteModel.findById(id).exec();
    return unite;
  }

  async update(id: string, data: UpdateUniteDto) {
    const updateUnite = await this.uniteModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updateUnite)
      throw new NotFoundException("La recette recherchée n'existe pas");
    return updateUnite;
  }

  async delete(uniteId: string) {
    const result = await this.uniteModel.findByIdAndDelete(uniteId).exec();
    if (!result) throw new NotFoundException("L'unité n'existe pas");
  }
}

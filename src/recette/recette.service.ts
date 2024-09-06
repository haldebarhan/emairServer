import { Injectable, NotFoundException } from '@nestjs/common';
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
    const query = this.recetteModel
      .find()
      .populate('ingredients.denree')
      .populate('type')
      .exec();
    return query;
  }

  async findOneRecette(recetteId: string) {
    const query = this.recetteModel
      .findById(recetteId)
      .populate('type')
      .populate('ingredients.denree')
      .exec();
    if (!query) throw new NotFoundException('denree non trouvee');
    return query;
  }

  async updateOneRecette(
    recetteId: string,
    updateRecetteDto: Partial<CreateRecetteDto>,
  ) {
    const updateRecette = await this.recetteModel
      .findByIdAndUpdate(recetteId, updateRecetteDto, { new: true })
      .exec();
    if (!updateRecette)
      throw new NotFoundException("La recette recherchée n'existe pas");
    return updateRecette;
  }

  async deleteRecette(denreeId: string): Promise<void> {
    const result = await this.recetteModel.findByIdAndDelete(denreeId).exec();
    if (!result) throw new NotFoundException("La recette n'existe pas");
  }
}

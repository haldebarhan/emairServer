import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Denree } from 'src/schemas/denree.schema';
import { CreateDenreeDto } from './dto/createDenree.dto';
import { UpdateDenreeDto } from './dto/updateDenree.dto';
import { throws } from 'assert';

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
    const query = await this.denreeModel
      .find()
      .populate('mesure')
      .populate('uc')
      .sort('produit')
      .exec();
    return query;
  }

  async findOne(id: string) {
    const query = await this.denreeModel
      .findById(id)
      .populate('mesure')
      .populate('uc')
      .exec();
    if (!query) throw new NotFoundException('Aucunes données trouvée');
    return query;
  }
  async updateDenree(denreeId: string, updateDenreeDto: UpdateDenreeDto) {
    const updatedUser = await this.denreeModel
      .findByIdAndUpdate(
        denreeId,
        {
          produit: updateDenreeDto.produit,
          mesure: updateDenreeDto.mesure,
        },
        { new: true },
      )
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${denreeId} not found`);
    }
    return updatedUser;
  }

  async deleteDenree(denreeId: string): Promise<void> {
    const result = await this.denreeModel.findByIdAndDelete(denreeId).exec();
    if (!result) {
      throw new NotFoundException(
        `Aucune denrée trouvée avec  l'ID ${denreeId}`,
      );
    }
  }
}

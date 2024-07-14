import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Consommation } from 'src/schemas/consommation.schema';
import { CreateConsommationDto } from './dto/create-consommation.dto';
import { UpdateConsommationDto } from './dto/update-consommation.dto';

@Injectable()
export class ConsommationService {
  constructor(
    @InjectModel(Consommation.name)
    private readonly consoModel: Model<Consommation>,
  ) {}

  async createConsommation(createConsommationDto: CreateConsommationDto) {
    const { date } = createConsommationDto;
    const createConso = new this.consoModel({
      ...createConsommationDto,
      date: new Date(date),
    });

    return createConso.save();
  }

  async findAll() {
    const query = this.consoModel
      .find()
      // .populate('menu')
      // .populate('report.unite')
      .exec();
    return query;
  }

  async findOne(consoId: string) {
    const query = this.consoModel.findById(consoId).exec();
    return query;
  }

  async findByDate(year: number, month: number) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59, 999);
    return this.consoModel.aggregate([
      {
        $match: {
          date: {
            $gte: start,
            $lt: end,
          },
        },
      },
    ]);
  }

  async updateConsommationById(consoId: string, update: UpdateConsommationDto) {
    const updateConso = await this.consoModel
      .findByIdAndUpdate(consoId, update, { new: true })
      .exec();
    if (!updateConso) {
      throw new NotFoundException('Le Numero de la consommation est incorrect');
    }
    return updateConso;
  }
}

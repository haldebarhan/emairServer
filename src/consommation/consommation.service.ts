import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Consommation } from 'src/schemas/consommation.schema';
import { CreateConsommationDto } from './dto/create-consommation.dto';

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

  async findByDate(searchDate: string) {
    const date = new Date(searchDate);
    const month: number = date.getMonth() + 1;
    const year: number = date.getFullYear();
    const startDate: Date = new Date(year, month - 1, 1);
    const endDate: Date = new Date(year, month, 0);
    return this.consoModel.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
    ]);
  }
}

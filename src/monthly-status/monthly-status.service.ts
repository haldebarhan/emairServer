import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MonthlyStatus } from 'src/schemas/monthly-status.schema';
import { CreateMonthlyStatusDto } from './dto/create-monthly-status.dto';

@Injectable()
export class MonthlyStatusService {
  constructor(
    @InjectModel(MonthlyStatus.name) private monthlyModel: Model<MonthlyStatus>,
  ) {}

  async create(data: CreateMonthlyStatusDto) {
    const query = new this.monthlyModel(data);
    return query.save();
  }

  async findAll() {
    const query = this.monthlyModel.find().exec();
    return query;
  }

  async findOne(id: string) {
    const query = this.monthlyModel.findById(id).exec();
    return query;
  }
}

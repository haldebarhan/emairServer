import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DaiLyOutput } from 'src/schemas/daily-output.schema';
import { CreateDailyOutputDto } from './dto/create-daily-output.dto';

@Injectable()
export class DailyOutputService {
  constructor(
    @InjectModel(DaiLyOutput.name) private dailyOutputModel: Model<DaiLyOutput>,
  ) {}

  async Create(data: CreateDailyOutputDto) {
    const query = new this.dailyOutputModel(data);
    return query.save();
  }

  async findOne(reportId: string) {
    const query = await this.dailyOutputModel
      .findOne({
        reportId: reportId,
      })
      .exec();

    return query;
  }
}

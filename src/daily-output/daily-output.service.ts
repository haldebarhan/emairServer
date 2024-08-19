import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DaiLyOutput } from 'src/schemas/daily-output.schema';
import { CreateDailyOutputDto } from './dto/create-daily-output.dto';
import { UpdateDailyOutputDto } from './dto/update-daily-output.dto';

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

  async findOneByDate(date: Date) {
    const query = await this.dailyOutputModel.findOne({ date: date }).exec();
    return query;
  }

  async update(consoId: string, update: UpdateDailyOutputDto) {
    const query = await this.dailyOutputModel
      .findOneAndUpdate({ reportId: consoId }, update, { new: true })
      .exec();
    return query;
  }

  async delete(consoId: string) {
    const query = await this.dailyOutputModel
      .findOneAndDelete({ reportId: consoId })
      .exec();
    return query;
  }
}

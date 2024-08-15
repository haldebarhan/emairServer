import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OutingBooklet } from 'src/schemas/outing-bouklet.schema';
import { CreateOutingBookletDto } from './dto/create-outing-booklet.dto';
import { UpdateOutingBookletDto } from './dto/update-outing-booklet.dto';

@Injectable()
export class OutingBookletService {
  constructor(
    @InjectModel(OutingBooklet.name)
    private readonly outingModel: Model<OutingBooklet>,
  ) {}

  async create(data: CreateOutingBookletDto) {
    const query = new this.outingModel(data);
    return query.save();
  }

  async update(bookId: string, update: UpdateOutingBookletDto) {
    const query = await this.outingModel
      .findByIdAndUpdate(bookId, update, {
        new: true,
      })
      .exec();
    return query;
  }

  async getFiltered(magasinId: string) {
    const query = await this.outingModel
      .find({ magasin: magasinId })
      .sort({ date: -1 })
      .exec();
    return query;
  }

  async filterByDate(date: Date) {
    const query = await this.outingModel.findOne({ date: date }).exec();
    return query;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMonthlyTableDto } from './dto/create-monthlyTable.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MonthlyTable } from 'src/schemas/monthly-table.schema';
import { Model } from 'mongoose';
import { UpdateMonthlyTableDto } from './dto/update-monthlyTable.dto';

@Injectable()
export class MonthlyTableService {
  constructor(
    @InjectModel(MonthlyTable.name)
    private readonly monthlyTableModel: Model<MonthlyTable>,
  ) {}
  async generateTable(tableData: CreateMonthlyTableDto) {
    const table = new this.monthlyTableModel(tableData);
    return table.save();
  }

  async findOneById(magasinId: string) {
    const result = await this.monthlyTableModel
      .findOne({ magasin: magasinId })
      .populate('magasin')
      .exec();
    return result;
  }

  async updateTable(tableId: string, data: UpdateMonthlyTableDto) {
    const update = await this.monthlyTableModel
      .findByIdAndUpdate(tableId, data, { new: true })
      .exec();
    if (!update) {
      throw new NotFoundException('Erreur rencontrée');
    }
    return update;
  }

  async getTableMagData(tableId: string) {
    const result = await this.monthlyTableModel
      .findById(tableId)
      .populate('magasin')
      .exec();

    return result;
  }
}

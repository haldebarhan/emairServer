import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stock } from 'src/schemas/stock.schema';
import { CreateStockDto } from './dto/create-stock.dto';
import { MagasinService } from 'src/magasin/magasin.service';
import { DenreeService } from 'src/denree/denree.service';

@Injectable()
export class StockService {
  constructor(@InjectModel(Stock.name) private stockModel: Model<Stock>) {}

  async generateStock(createStockDto: CreateStockDto) {
    const createStock = new this.stockModel(createStockDto);
    return createStock.save();
  }

  async findAll() {
    return this.stockModel
      .find()
      .populate('magasin')
      .populate('denrees.denree')
      .exec();
  }

  async findOne(stockId: string) {
    return this.stockModel
      .findById(stockId)
      .populate('magasin')
      .populate('denrees.denree')
      .exec();
  }
}

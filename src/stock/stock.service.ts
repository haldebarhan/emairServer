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
    //   const magasin = await this.magService.getOne(createStockDto.magasin);
    //   if (!magasin) throw new Error('Magasin not found');
    //   const produits = await Promise.all(
    //     createStockDto.produits.map(async (produit) => {
    //       const denree = await this.denreeService.findOne(produit.produit);
    //       if (!denree) throw new Error('Denree not found');
    //       return { produit: denree.id, qteInitial: produit.qteInitial };
    //     }),
    //   );
    //   const createStock = new this.stockModel({
    //     magasin: magasin._id,
    //     produits: produits,
    //   });
    //   return createStock.save();
    // }
    // async getStock(magasinId: string) {
    //   const stock = await this.stockModel
    //     .findOne({ magasin: magasinId })
    //     .populate('magasin')
    //     .exec();
    //   return stock
    // if (!stock) {
    //   throw new NotFoundException(
    //     `Stock for magasin with id ${magasinId} not found`,
    //   );
    // }
    // const produits = await Promise.all(
    //   stock.produits.map(async(produit)=> {
    //     console.log(produit)
    //     const denree = await this.denreeService.findOne(produit.denree.produit)
    //     if (!denree) throw new Error('Denree not found');
    //     return {...denree, qteInitial: produit.qteInitial}
    //   })
    // )
    // const produits = stock.produits.map((produit) => console.log(produit));
    // ({
    //   produit: produit.denree,
    //   qteInitial: produit.qteInitial,
    // }));
    // return stock;
    // return {
    //   magasin: stock.magasin,
    //   produits: produits,
    // };
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

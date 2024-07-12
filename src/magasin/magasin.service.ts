import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Magasin } from 'src/schemas/magasin.schema';
import { CreateMagasinDto } from './dto/create-magasin.dto';
import { IAppro } from 'src/models/Approvisionnement';
import { Denree } from 'src/schemas/denree.schema';

@Injectable()
export class MagasinService {
  constructor(@InjectModel(Magasin.name) private MagModel: Model<Magasin>) {}

  async create(createMagasinDto: CreateMagasinDto) {
    const createMag = new this.MagModel(createMagasinDto);
    return createMag.save();
  }

  async findAll() {
    const query = await this.MagModel.find()
      .populate('stock.denree')
      .sort({ date: -1 })
      .limit(1)
      .exec();
    return query;
  }

  async getOne(id: string) {
    const query = await this.MagModel.findById(id)
      .populate('stock.denree')
      .exec();
    return query;
  }

  async updateStockBySupply(data: IAppro) {
    const magasin = await this.MagModel.findById(data.magasin)
      .populate('stock.denree')
      .exec();
    if (!magasin) {
      throw new NotFoundException(`Magasin with ID ${data.magasin} not found`);
    }
    const updates = data.produits.map((stock) => {
      const stockItem = magasin.stock.find(
        (item) => item.denree.produit == stock.denreeName,
      );
      if (!stockItem) {
        throw new NotFoundException(
          `Denree with ID ${stock.denreeName} not found in magasin`,
        );
      }
      const newAppro =
        stock.quantite !== undefined
          ? stockItem.appro + stock.quantite
          : stockItem.appro;
      const newBalance = newAppro - stockItem.conso;
      return {
        updateOne: {
          filter: { _id: magasin._id, 'stock.denree': stock.denreeId },
          update: {
            $set: {
              'stock.$.appro': newAppro,
              'stock.$.balance': newBalance,
            },
          },
        },
      };
    });

    const result = await this.MagModel.bulkWrite(updates);
    if (result.modifiedCount === 0) {
      throw new NotFoundException(
        `Magasin with ID ${magasin._id} or Denree(s) not found`,
      );
    }

    return result;
  }

  async findDenree(magasinId: string, denreeId: string, returned: string) {
    const query = await this.MagModel.find(
      {
        _id: magasinId,
        'stock.denree': denreeId,
      },
      { date: 1, stock: { $elemMatch: { denree: denreeId } } },
    ).exec();

    const result = query[0];
    const data: { conso: any; balance: any; appro: any } = {
      conso: result.stock[0].conso,
      balance: result.stock[0].balance,
      appro: result.stock[0].appro,
    };
    switch (returned) {
      case 'appro':
        return data.appro;
      case 'conso':
        return data.conso;
      case 'balance':
        return data.balance;
    }
  }

  // findDenree(
  //   stock: {
  //     denree: Denree;
  //     quantite: Number;
  //     conso: Number;
  //     appro: Number;
  //     balance: Number;
  //   }[], searched: string
  // ) {
  //   const finded = stock.find(article => article.denree.produit == searched)
  //   return finded
  // }
}

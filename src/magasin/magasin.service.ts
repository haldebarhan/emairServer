import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Magasin } from 'src/schemas/magasin.schema';
import { CreateMagasinDto } from './dto/create-magasin.dto';
import { IAppro } from 'src/models/Approvisionnement';
import { Denree } from 'src/schemas/denree.schema';
import { getNextMonth } from 'src/helpers/next-month.helper';

@Injectable()
export class MagasinService {
  constructor(@InjectModel(Magasin.name) private MagModel: Model<Magasin>) {}

  async create(createMagasinDto: CreateMagasinDto) {
    const createMag = new this.MagModel(createMagasinDto);
    return createMag.save();
  }

  async nextMonth(data: CreateMagasinDto) {
    const query = new this.MagModel(data);
    return query.save();
  }

  async findOneByDate(datStr: string) {
    const date = new Date(datStr);
    const query = await this.MagModel.findOne({
      date: date,
    })
      .sort({ date: -1 })
      .populate('stock.denree')
      .limit(1)
      .exec();
    return query;
  }

  async findOne() {
    const query = await this.MagModel.findOne()
      .sort({ date: -1 })
      .populate('stock.denree')
      .exec();
    return query;
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

  async updateStockByConso(
    magasinId: string,
    data: { produit: string; quantite: number }[],
  ) {
    const magasin = await this.MagModel.findById(magasinId)
      .populate('stock.denree')
      .exec();

    const updates = data.map((denree) => {
      const stockItem: any = magasin.stock.find(
        (item) => item.denree.produit == denree.produit,
      );
      if(!stockItem || stockItem.balance < denree.quantite) throw new NotFoundException(`Une recette contient la denree ${denree.produit} qui n'est pas en stock`)
      const newConso =
        denree.quantite !== undefined
          ? +stockItem.conso + +denree.quantite
          : +stockItem.conso;
      const newBalance = +stockItem.balance - denree.quantite;
      return {
        updateOne: {
          filter: {
            _id: magasin._id,
            'stock.denree': stockItem.denree._id,
          },
          update: {
            $set: {
              'stock.$.conso': newConso,
              'stock.$.balance': newBalance,
            },
          },
        },
      };
    });

    const result = await this.MagModel.bulkWrite(updates);
    return result;
  }

  async restoreStock(
    magasinId: string,
    data: { produit: string; quantite: number }[],
  ) {
    const magasin = await this.MagModel.findById(magasinId)
      .populate('stock.denree')
      .exec();

    const updates = data.map((denree) => {
      const stockItem: any = magasin.stock.find(
        (item) => item.denree.produit === denree.produit,
      );
      const newConso = stockItem.conso - denree.quantite;
      const newBalance = stockItem.balance + denree.quantite;

      return {
        updateOne: {
          filter: {
            _id: magasin._id,
            'stock.denree': stockItem.denree._id,
          },
          update: {
            $set: {
              'stock.$.conso': newConso,
              'stock.$.balance': newBalance,
            },
          },
        },
      };
    });
    const result = await this.MagModel.bulkWrite(updates);
    return result;
  }

  async updateStockBySupply(data: IAppro) {
    const magasin = await this.MagModel.findById(data.magasin)
      .populate('stock.denree')
      .exec();

    if (!magasin) {
      throw new NotFoundException(`Magasin with ID ${data.magasin} not found`);
    }

    data.produits.forEach((stock) => {
      let stockItem = magasin.stock.find(
        (item) => item.denree.produit === stock.denree.produit,
      );

      if (!stockItem) {
        stockItem = {
          denree: stock.denree,
          quantite: 0,
          conso: 0,
          appro: stock.quantite,
          balance: stock.quantite,
        };
        magasin.stock.push(stockItem);
      } else {
        const newAppro =
          stock.quantite !== undefined
            ? stockItem.appro + stock.quantite
            : stockItem.appro;
        const newBalance = newAppro - stockItem.conso;
        stockItem.appro = newAppro;
        stockItem.balance = newBalance;
      }
    });

    const result = await magasin.save();
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
}

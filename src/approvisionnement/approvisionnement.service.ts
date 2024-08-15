import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Approvisionnement } from 'src/schemas/approvisionnement.schema';
import { CreateApproDto } from './dto/create-appro.dto';

@Injectable()
export class ApprovisionnementService {
  constructor(
    @InjectModel(Approvisionnement.name)
    private readonly approModel: Model<Approvisionnement>,
  ) {}

  async createAppro(data: CreateApproDto) {
    const query = new this.approModel(data);
    return query.save();
  }

  async fiterSupplies(year: number, month: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);
    const query = await this.approModel
      .find({
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .populate({
        path: 'produits',
        populate: [{ path: 'denree' }],
      })
      .populate({
        path: 'produits.denree',
        populate: [{ path: 'mesure' }],
      })
      .exec();
    return query;
  }

  async filterByMagId(magId: string) {
    const query = await this.approModel
      .find({
        magasin: magId,
      })
      .populate({
        path: 'produits',
        populate: [{ path: 'denree' }],
      })
      .populate({
        path: 'produits.denree',
        populate: [{ path: 'mesure' }],
      })
      .sort({ date: -1 })
      .exec();
    return query;
  }

  async filterbyDate(date: Date) {
    const combined: { produit: string; quantite: number }[] = [];
    const query = await this.approModel.find({ date: date }).exec();
    if (query) {
      query.forEach((data) => {
        data.produits.forEach((produit) => {
          const finded = combined.find(
            (find) => find.produit === produit.denreeName,
          );
          if (finded) {
            finded.quantite += produit.quantite;
          } else {
            combined.push({
              produit: produit.denreeName,
              quantite: produit.quantite,
            });
          }
        });
      });
    }
    return combined;
  }
}

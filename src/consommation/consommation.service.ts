import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Consommation } from 'src/schemas/consommation.schema';
import { CreateConsommationDto } from './dto/create-consommation.dto';
import { UpdateConsommationDto } from './dto/update-consommation.dto';
import { MenuService } from 'src/menu/menu.service';
import { DenreeService } from 'src/denree/denree.service';
import { Report } from 'src/models/Report';
import { ProductsUsedCalculation } from 'src/helpers/products-used.helper';
import { MagasinService } from 'src/magasin/magasin.service';
import { OutingBookletService } from 'src/outing-booklet/outing-booklet.service';
import { ApprovisionnementService } from 'src/approvisionnement/approvisionnement.service';
import { CreateOutingBookletDto } from 'src/outing-booklet/dto/create-outing-booklet.dto';
import { UpdateOutingBookletDto } from 'src/outing-booklet/dto/update-outing-booklet.dto';

@Injectable()
export class ConsommationService {
  constructor(
    @InjectModel(Consommation.name)
    private readonly consoModel: Model<Consommation>,
    private readonly menuService: MenuService,
    private readonly denreeService: DenreeService,
    private readonly magasinService: MagasinService,
    private readonly bookingService: OutingBookletService,
    private readonly approService: ApprovisionnementService,
  ) {}

  async createConsommation(createConsommationDto: CreateConsommationDto) {
    const { date } = createConsommationDto;
    const createConso = new this.consoModel({
      ...createConsommationDto,
      date: new Date(date),
    });

    return createConso.save();
  }

  async findAll() {
    const query = this.consoModel
      .find()
      // .populate('menu')
      // .populate('report.unite')
      .exec();
    return query;
  }

  async findOne(consoId: string) {
    const query = this.consoModel.findById(consoId).exec();
    return query;
  }

  async findByDate(year: number, month: number) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59, 999);
    return this.consoModel.aggregate([
      {
        $match: {
          date: {
            $gte: start,
            $lt: end,
          },
        },
      },
    ]);
  }

  async updateConsommationById(consoId: string, update: UpdateConsommationDto) {
    const updateConso = await this.consoModel
      .findByIdAndUpdate(consoId, update, { new: true })
      .exec();
    if (!updateConso) {
      throw new NotFoundException('Le Numero de la consommation est incorrect');
    }
    return updateConso;
  }

  async emitReport(id: string) {
    const report = await this.consoModel
      .findById(id)
      .populate({
        path: 'menu',
        populate: [
          { path: 'petit_dejeuner' },
          { path: 'dejeuner' },
          { path: 'hors_doeuvre' },
          { path: 'dessert' },
          { path: 'diner' },
        ],
      })
      .exec();
    return report;
  }
  async deleteConso(id: string) {
    const result = await this.consoModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException("Le rapport n'existe pas ");
  }

  async updateReport(id: string) {
    const query = this.consoModel
      .findByIdAndUpdate(id, { transmit: true }, { new: true })
      .exec();
    return query;
  }

  async filterByDate(date: Date) {
    const query = await this.consoModel.findOne({ date: date }).exec();
    return query;
  }

  async create(data: CreateConsommationDto) {
    const query = new this.consoModel(data);
    return query.save();
  }

  async update(consoId: string, update: UpdateConsommationDto) {
    const query = this.consoModel
      .findByIdAndUpdate(consoId, update, {
        new: true,
      })
      .exec();
    return query;
  }

  async getMealData(report: any, key: string) {
    const meal = report.menu[key];
    const allDenree = await this.denreeService.findAll();
    const data = meal.ingredients.map((item: any) => {
      const denreeCorrespondante = allDenree.find(
        (denree: any) => denree._id.toString() === item.denree.toString(),
      );

      return {
        ration: item.ration,
        unite: item.unite,
        produit: denreeCorrespondante.produit,
        uc: denreeCorrespondante.uc.conversion,
        mesure: denreeCorrespondante.mesure.unite,
        eq: denreeCorrespondante.equivalence,
      };
    });
    return data;
  }

  // async manageData(data: CreateConsommationDto[]) {
  //   data.forEach(async (item, index) => {
  //     const result = await this.filterByDate(item.date);
  //     const menuId = (
  //       await this.menuService.findMenuByDay(item.jour)
  //     )._id.toString();

  //     if (!result) {
  //       const createConso = await this.create({ ...item, menu: menuId });
  //       const new_data = await this.collectData(createConso._id.toString());
  //       await this.magasinService
  //         .updateStockByConso(item.magasin, new_data)
  //         .then(async () => {
  //           const books = await this.createBook(item.magasin, item.date);
  //           const booklet: CreateOutingBookletDto = {
  //             date: item.date,
  //             magasin: item.magasin,
  //             total_matin: item.total_matin,
  //             total_midi: item.total_midi,
  //             total_soir: item.total_soir,
  //             carnet: books,
  //           };
  //           await this.bookingService.create(booklet);
  //         })
  //         .catch(async (err: NotFoundException) => {
  //           await this.deleteConso(createConso._id.toString());
  //           throw new NotFoundException(
  //             `Une recette contient la denree ${err.message} qui n'existe pas en stock. le rapport du jour ${index + 1} ne sera pas enregistré`,
  //           );
  //         });
  //     } else {
  //       if (
  //         result.total_matin !== item.total_matin ||
  //         result.total_midi !== item.total_midi ||
  //         result.total_soir !== item.total_soir
  //       ) {
  //         const old_data = await this.collectData(result._id.toString());
  //         // restaurer le stock
  //         await this.magasinService.restoreStock(item.magasin, old_data);
  //         // update
  //         await this.update(result._id.toString(), { ...item, menu: menuId });
  //         const new_data = await this.collectData(result._id.toString());
  //         await this.magasinService.updateStockByConso(item.magasin, new_data);
  //       }
  //     }
  //   });
  // }

  async manageData(data: CreateConsommationDto[]): Promise<void> {
    const errors: { statusCode: number; message: string; error: string }[] = [];

    for (const [index, item] of data.entries()) {
      let createConsoId: string | null = null; // Pour stocker l'ID de la consommation créée

      try {
        const result = await this.filterByDate(item.date);
        const menuId = (
          await this.menuService.findMenuByDay(item.jour)
        )._id.toString();

        if (!result) {
          const createConso = await this.create({ ...item, menu: menuId });
          createConsoId = createConso._id.toString(); // Stocker l'ID

          const newData = await this.collectData(createConsoId);
          await this.magasinService.updateStockByConso(item.magasin, newData);

          const books = await this.createBook(item.magasin, item.date);
          const booklet: CreateOutingBookletDto = {
            date: item.date,
            magasin: item.magasin,
            total_matin: item.total_matin,
            total_midi: item.total_midi,
            total_soir: item.total_soir,
            carnet: books,
          };
          await this.bookingService.create(booklet);
        } else {
          if (
            result.total_matin !== item.total_matin ||
            result.total_midi !== item.total_midi ||
            result.total_soir !== item.total_soir
          ) {
            const oldData = await this.collectData(result._id.toString());
            await this.magasinService.restoreStock(item.magasin, oldData);
            await this.update(result._id.toString(), { ...item, menu: menuId });
            const newData = await this.collectData(result._id.toString());
            await this.magasinService.updateStockByConso(item.magasin, newData);

            const books = await this.createBook(item.magasin, item.date);
            const bookId = (
              await this.bookingService.filterByDate(item.date)
            )._id.toString();

            const booklet: UpdateOutingBookletDto = {
              date: item.date,
              magasin: item.magasin,
              total_matin: item.total_matin,
              total_midi: item.total_midi,
              total_soir: item.total_soir,
              carnet: books,
            };
            await this.bookingService.update(bookId, booklet);
          }
        }
      } catch (error) {
        if (error instanceof NotFoundException) {
          if (createConsoId) {
            // Supprimer la consommation si une erreur survient après sa création
            await this.deleteConso(createConsoId);
          }
          errors.push({
            statusCode: 404,
            message: `${item.index}`,
            error: 'Not Found',
          });
        }
      }
    }

    if (errors.length > 0) {
      throw new NotFoundException(errors);
    }
  }

  async createBook(magasinId: string, date: Date) {
    const appro = await this.approService.filterbyDate(date);
    const magasin = await this.magasinService.getOne(magasinId);
    const products = magasin.stock;
    const books = products.map((item) => {
      const find = appro.find(
        (product) => product.produit === item.denree.produit,
      );
      return {
        produit: item.denree.produit,
        conso: item.conso,
        appro: find ? find.quantite : 0,
        existant: item.quantite,
      };
    });

    return books;
  }

  async collectData(id: string) {
    const report = await this.emitReport(id.toString());
    const petit_dejeuner = await this.getMealData(report, 'petit_dejeuner');
    const hors_doeuvre = await this.getMealData(report, 'hors_doeuvre');
    const dejeuner = await this.getMealData(report, 'dejeuner');
    const dessert = await this.getMealData(report, 'dessert');
    const diner = await this.getMealData(report, 'diner');
    const informations: Report = {
      petit_dejeuner: {
        effectif: report.total_matin,
        recette: report.menu.petit_dejeuner.nomRecette,
        denrees: petit_dejeuner,
      },
      dejeuner: {
        effectif: report.total_midi,
        recette: report.menu.dejeuner.nomRecette,
        denrees: dejeuner,
      },
      hors_doeuvre: {
        effectif: report.total_midi,
        recette: report.menu.hors_doeuvre.nomRecette,
        denrees: hors_doeuvre,
      },
      dessert: {
        effectif: report.total_midi,
        recette: report.menu.dessert.nomRecette,
        denrees: dessert,
      },
      diner: {
        effectif: report.total_soir,
        recette: report.menu.diner.nomRecette,
        denrees: diner,
      },
    };
    const Calculation = new ProductsUsedCalculation(informations);
    const sorties = Calculation.getTotalFoods();
    const denrees = sorties.map((item: any) => {
      return {
        produit: item.produit,
        matin: item.matin,
        soir: item.soir,
        unite: item.unite,
      };
    });

    const updates = denrees.map((item) => {
      return {
        produit: `${item.produit.toString()}`,
        quantite: +item.matin + +item.soir,
      };
    });
    return updates;
  }
}

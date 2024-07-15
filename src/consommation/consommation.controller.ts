import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ConsommationService } from './consommation.service';
import { CreateConsommationDto } from './dto/create-consommation.dto';
import { UpdateConsommationDto } from './dto/update-consommation.dto';
import { DenreeService } from 'src/denree/denree.service';
import { Consommation } from 'src/schemas/consommation.schema';
import { Document, Types } from 'mongoose';
import { ProductsUsedCalculation } from 'src/helpers/products-used.helper';
import { Report } from 'src/models/Report';
import { DailyOutputService } from 'src/daily-output/daily-output.service';
import { DaiLyOutput } from 'src/models/daily-output';
import { MagasinService } from 'src/magasin/magasin.service';

@Controller('consommation')
export class ConsommationController {
  constructor(
    private readonly consoService: ConsommationService,
    private denreeService: DenreeService,
    private dailyService: DailyOutputService,
    private magService: MagasinService
  ) {}

  @Post()
  async createConso(@Body() createConsommationDto: CreateConsommationDto) {
    const result = await this.consoService.createConsommation(
      createConsommationDto,
    );
    return result;
  }

  @Get()
  async findConso() {
    const result = await this.consoService.findAll();
    return result;
  }

  @Get('/emit/:id')
  async emitReport(@Param('id') id: string) {
    const report = await this.consoService.emitReport(id);
    const petit_dejeunerData = await this.getMealData(report, 'petit_dejeuner');
    const hors_doeuvreData = await this.getMealData(report, 'hors_doeuvre');
    const dejeunerData = await this.getMealData(report, 'dejeuner');
    const dessertData = await this.getMealData(report, 'dessert');
    const dinerData = await this.getMealData(report, 'diner');
    const { breakfast, lunch, diner } = this.numberOfUnitTakingMeals(report);
    const informations: Report = {
      petit_dejeuner: {
        effectif: breakfast,
        recette: report.menu.petit_dejeuner.nomRecette,
        denrees: petit_dejeunerData,
      },
      dejeuner: {
        effectif: lunch,
        recette: report.menu.dejeuner.nomRecette,
        denrees: dejeunerData,
      },
      hors_doeuvre: {
        effectif: lunch,
        recette: report.menu.hors_doeuvre.nomRecette,
        denrees: hors_doeuvreData,
      },
      dessert: {
        effectif: lunch,
        recette: report.menu.dessert.nomRecette,
        denrees: dessertData,
      },
      diner: {
        effectif: diner,
        recette: report.menu.diner.nomRecette,
        denrees: dinerData,
      },
    };
    const Calculation = new ProductsUsedCalculation(informations)
    const sorties = Calculation.getTotalFoods()
    const denrees = sorties.map((item: any) => {
      return {produit: item.produit, matin: item.matin, soir: item.soir, unite: item.unite}
    })

    const updates = denrees.map(item => {
      return {produit: `${item.produit.toString()}`, quantite: item.matin + item.soir}
    })
    
    const dailReport: DaiLyOutput = {
      reportId: report._id.toString(),
      date: report.date,
      pdej: Calculation.getBreackFastRecipe(),
      dej: Calculation.getLunchRecipe(),
      hd: Calculation.getHDRecipe(),
      des: Calculation.getDessertRecipe(),
      din: Calculation.getDinerRecipe(),
      pdej_effect: Calculation.getBreakfastHeadcount(),
      dej_effect: Calculation.getLunchHeadcount(),
      din_effect: Calculation.getDinerHeadcount(),
      sorties: denrees
    }
    const createDailyReport = await this.dailyService.Create(dailReport)
    const month = createDailyReport.date.getMonth() + 1
    const year = createDailyReport.date.getFullYear()
    await this.magService.updateStockByConso(month, year, updates)
    const update = await this.consoService.updateReport(report._id.toString())
    return update
  }

  @Get('/report/:year/:month')
  async filterConsoByMonth(
    @Param('year') year: number,
    @Param('month') month: number,
  ) {
    const result = await this.consoService.findByDate(year, month);
    return result;
  }

  @Get(':id')
  async getConsoById(@Param('id') id: string) {
    const result = this.consoService.findOne(id);
    return result;
  }

  @Patch(':id')
  async updateConso(
    @Param('id') id: string,
    @Body() update: UpdateConsommationDto,
  ) {
    const result = await this.consoService.updateConsommationById(id, update);
    return result;
  }

  @Delete(':id')
  async deleleConso(@Param('id') id: string): Promise<void> {
    return this.consoService.deleteConso(id);
  }

  async getMealData(report: any, key: string) {
    const meal = report.menu[key];
    const allDenree = await this.denreeService.findAll();
    const data = meal.ingredients.map((item) => {
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

  numberOfUnitTakingMeals(report: any) {
    let breakfast = 0;
    let lunch = 0;
    let diner = 0;

    report.report.map((item: any) => {
      breakfast += item.petit_dejeuner;
      lunch += item.dejeuner;
      diner += item.diner;
    });
    return { breakfast, lunch, diner };
  }
}

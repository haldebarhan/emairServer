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

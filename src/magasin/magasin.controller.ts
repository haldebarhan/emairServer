import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MagasinService } from './magasin.service';
import { CreateMagasinDto } from './dto/create-magasin.dto';
import { Magasin } from 'src/schemas/magasin.schema';
import { DenreeService } from 'src/denree/denree.service';
import { getNextMonth } from 'src/helpers/next-month.helper';
import { MonthlyTableService } from 'src/monthly-table/monthly-table.service';
import { UniteService } from 'src/unite/unite.service';
import { getDayInMonth } from 'src/helpers/dayInmonth.helper';
import { CreateMonthlyTableDto } from 'src/monthly-table/dto/create-monthlyTable.dto';

@Controller('magasin')
export class MagasinController {
  constructor(
    private readonly magService: MagasinService,
    private readonly denreeService: DenreeService,
    private readonly monthlyTable: MonthlyTableService,
    private readonly uniteService: UniteService,
  ) {}

  @Post()
  async create(@Body() body: { year: string; month: string }) {
    const result = await this.magService.findOne();
    if (!result) {
      const date = new Date(`${body.year}-${body.month}-01T00:00:00Z`);
      const data: CreateMagasinDto = { date };
      const magasin = await this.magService.create(data);
      const units = await this.uniteService.findAll();
      const totalDay = getDayInMonth(+body.month, +body.year);
      const unites = units.map((unite) => {
        return {
          nom: unite.nom,
          matin: Array(totalDay).fill(''),
          midi: Array(totalDay).fill(''),
          soir: Array(totalDay).fill(''),
          totalMatin: 0,
          totalMidi: 0,
          totalSoir: 0,
        };
      });
      let totalMatin = Array(totalDay).fill('');
      let totalMidi = Array(totalDay).fill('');
      let totalSoir = Array(totalDay).fill('');
      let totalRow = Array(totalDay).fill(0);

      const tableData: CreateMonthlyTableDto = {
        magasin: magasin._id.toString(),
        unites,
        totalMatin,
        totalMidi,
        totalSoir,
        totalRow,
      };
      await this.monthlyTable.generateTable(tableData);
      return magasin;
    } else {
      return result;
    }
  }

  @Get('/find/:date')
  async findByDate(@Param('date') date: string) {
    const result = await this.magService.findOneByDate(date);
    const stock = result.stock.map((denree: any) => {
      return {
        produit: denree.denree.produit,
        quantite: denree.quantite,
        conso: denree.conso,
        appro: denree.appro,
        balance: denree.balance,
        prix: denree.denree.pu,
        id: denree.denree._id,
      };
    });
    const data = { id: result._id, date: result.date, stock: stock };
    return data;
  }

  @Get()
  async findAll() {
    const result = await this.magService.findOne();
    if (result) {
      const stock = result.stock.map((denree: any) => {
        return {
          produit: denree.denree.produit,
          quantite: denree.quantite,
          conso: denree.conso,
          appro: denree.appro,
          balance: denree.balance,
          prix: denree.denree.pu,
          id: denree.denree._id,
        };
      });
      const data = { id: result._id, date: result.date, stock: stock };
      return data;
    } else {
      return null;
    }
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const result = await this.magService.getOne(id);
    const stock = result.stock.map((denree) => {
      return {
        produit: denree.denree.produit,
        quantite: denree.quantite,
        conso: denree.conso,
        appro: denree.appro,
        balance: denree.balance,
        prix: denree.denree.pu,
        um: denree.denree.mesure,
      };
    });
    const data = {
      id: result._id,
      date: result.date,
      stock: stock,
      completed: result.complete,
    };
    return data;
  }
}

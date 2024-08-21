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
import { getCurrentMonthAndYear } from 'src/helpers/getCurrentMonthAndYear';
import { CreateOutingBookletDto } from 'src/outing-booklet/dto/create-outing-booklet.dto';
import { OutingBookletService } from 'src/outing-booklet/outing-booklet.service';
import { MonthlyStatusService } from 'src/monthly-status/monthly-status.service';

@Controller('magasin')
export class MagasinController {
  constructor(
    private readonly magService: MagasinService,
    private readonly denreeService: DenreeService,
    private readonly monthlyTable: MonthlyTableService,
    private readonly uniteService: UniteService,
    private readonly outingBookletService: OutingBookletService,
    private readonly monthlyStatusService: MonthlyStatusService
  ) {}

  @Post('/next-month')
  async nextMonth(@Body() data: { magasin: string }) {
    try {
      const denrees = await this.denreeService.findAll();
      const current_store = await this.magService.getOne(data.magasin);
      const current_store_date = current_store.date;
      const current_store_stock = current_store.stock;

      const next_store_date_string = getNextMonth(
        current_store_date.toString(),
      );
      const next_store_date = new Date(next_store_date_string);
      const next_month_store_stock = current_store_stock.map((produit) => {
        const finded = denrees.find(
          (prod) => prod.produit == produit.denree.produit,
        );
        return {
          denree: finded._id.toString(),
          quantite: produit.balance,
          conso: 0,
          appro: 0,
          balance: produit.balance,
        };
      });

      const next_month_data: CreateMagasinDto = {
        date: next_store_date,
        stock: next_month_store_stock,
      };

      const new_store_id = (await this.magService.create(next_month_data))._id.toString();
      const created_store = await this.magService.getOne(new_store_id)
   
      let { year, month } = getCurrentMonthAndYear(
        created_store.date.toString(),
      );
      month += 1;
      const totalDay = getDayInMonth(month, year);
      const units = await this.uniteService.findAll();
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
        magasin: created_store._id.toString(),
        unites,
        totalMatin,
        totalMidi,
        totalSoir,
        totalRow,
      };

      await this.monthlyTable.generateTable(tableData);

      const carnet = created_store.stock.map((denree) => {
        const existant = denree.quantite;
        const appro = Array<number>(totalDay).fill(0);
        const conso = Array<number>(totalDay).fill(0);
        const balance = Array<number>(totalDay).fill(0);
        balance[0] = existant
        return {
          produit: denree.denree.produit,
          appro: appro,
          conso: conso,
          balance: balance,
          existant: existant,
        };
      });
      const outingBooklet_data: CreateOutingBookletDto = {
        magasin: created_store._id.toString(),
        total_matin: Array<number>(totalDay).fill(0),
        total_midi: Array<number>(totalDay).fill(0),
        total_soir: Array<number>(totalDay).fill(0),
        carnet,
      };

      await this.outingBookletService.create(outingBooklet_data);
      const monthly_date = {date: current_store_date}
      await this.monthlyStatusService.create(monthly_date)
      return created_store;
    } catch (err) {
      console.log(err);
    }
  }

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

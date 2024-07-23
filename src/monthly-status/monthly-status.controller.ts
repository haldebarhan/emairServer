import { Controller, Get, Param } from '@nestjs/common';
import { MonthlyStatusService } from './monthly-status.service';
import { MagasinService } from 'src/magasin/magasin.service';
import { DenreeService } from 'src/denree/denree.service';
import { getNextMonth } from 'src/helpers/next-month.helper';

@Controller('monthly-status')
export class MonthlyStatusController {
  constructor(
    private readonly monthlyService: MonthlyStatusService,
    private magService: MagasinService,
    private denreeService: DenreeService,
  ) {}

  @Get('/create')
  async createNxMonth() {
    const magasin = await this.magService.findOne();
    if (magasin) {
      const denrees = await this.denreeService.findAll();
      const nexMonthStock = magasin.stock.map((denree) => {
        const filter: any = denrees.find(
          (d) => d.produit === denree.denree.produit,
        );
        return {
          denree: filter._id,
          quantite: denree.balance,
          balance: denree.balance,
        };
      });
      const date = getNextMonth(magasin.date.toISOString());
      const formatDate = new Date(date);
      const data = { date: formatDate, stock: nexMonthStock };
      await this.magService.nextMonth(data);
      const createStatus = await this.monthlyService.create({
        date: new Date(magasin.date.toISOString()),
      });
      return createStatus;
    }
  }
  @Get()
  async getAll() {
    const results = await this.monthlyService.findAll();
    return results;
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const result = await this.monthlyService.findOne(id);
    return result;
  }
}

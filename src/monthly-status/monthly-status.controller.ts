import { Controller, Get, Param } from '@nestjs/common';
import { MonthlyStatusService } from './monthly-status.service';
import { MagasinService } from 'src/magasin/magasin.service';
import { DenreeService } from 'src/denree/denree.service';
import { getNextMonth } from 'src/helpers/next-month.helper';

@Controller('monthly-status')
export class MonthlyStatusController {
  constructor(
    private readonly monthlyService: MonthlyStatusService,
  ) {}


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

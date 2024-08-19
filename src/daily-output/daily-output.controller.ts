import { Controller, Get, Param } from '@nestjs/common';
import { CreateDailyOutputDto } from './dto/create-daily-output.dto';
import { DailyOutputService } from './daily-output.service';

@Controller('daily-report')
export class DailyOutputController {
  constructor(private readonly dailyService: DailyOutputService) {}

  @Get(':year/:month/:index')
  async getOne(
    @Param('year') year: number,
    @Param('month') month: number,
    @Param('index') index: number,
  ) {
    const date = new Date(`${year}-${month}-${index}`);
    const result = await this.dailyService.findOneByDate(date);
    return result;
  }
  async Create(data: CreateDailyOutputDto) {
    const result = await this.dailyService.Create(data);
    return result;
  }
}

import { Controller, Get, Param } from '@nestjs/common';
import { CreateDailyOutputDto } from './dto/create-daily-output.dto';
import { DailyOutputService } from './daily-output.service';

@Controller('daily-report')
export class DailyOutputController {
  constructor(private readonly dailyService: DailyOutputService) {}

  
  @Get(':id')
  async getOne(@Param('id') id: string) {
    const result = await this.dailyService.findOne(id);
    return result;
  }
  async Create(data: CreateDailyOutputDto) {
    const result = await this.dailyService.Create(data);
    return result;
  }
}

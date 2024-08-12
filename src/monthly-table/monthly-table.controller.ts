import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MonthlyTableService } from './monthly-table.service';
import { UpdateMonthlyTableDto } from './dto/update-monthlyTable.dto';

@Controller('monthly-table')
export class MonthlyTableController {
  constructor(private readonly monthlyTableService: MonthlyTableService) {}

  @Put(':id')
  async updateTable(
    @Param('id') id: string,
    @Body() data: UpdateMonthlyTableDto,
  ) {
    const result = await this.monthlyTableService.updateTable(id, data);
    return result;
  }

  @Get('magasin/:id')
  async findOne(@Param('id') id: string) {
    const result = this.monthlyTableService.findOneById(id);
    return result;
  }
}

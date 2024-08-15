import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MonthlyTableService } from './monthly-table.service';
import { UpdateMonthlyTableDto } from './dto/update-monthlyTable.dto';
import { getCurrentMonthAndYear } from 'src/helpers/getCurrentMonthAndYear';
import { MenuService } from 'src/menu/menu.service';
import { getDayName } from 'src/helpers/getDayName';
import { CreateConsommationDto } from 'src/consommation/dto/create-consommation.dto';
import { ConsommationService } from 'src/consommation/consommation.service';

@Controller('monthly-table')
export class MonthlyTableController {
  constructor(
    private readonly monthlyTableService: MonthlyTableService,
    private readonly consoService: ConsommationService,
  ) {}

  // @Put(':id')
  // async updateTable(
  //   @Param('id') id: string,
  //   @Body() data: UpdateMonthlyTableDto,
  // ) {
  //   const result = await this.monthlyTableService.updateTable(id, data);
  //   const date = (await this.monthlyTableService.getTableMagData(id)).magasin
  //     .date;
  //   const { year, month } = getCurrentMonthAndYear(date.toString());
  //   const linesInvolved = [];
  //   data.totalMatin.forEach(async (item, index) => {
  //     let line = {
  //       jour: '',
  //       total_matin: +item,
  //       total_midi: +data.totalMidi[index],
  //       total_soir: +data.totalSoir[index],
  //       date: new Date(),
  //       magasin: data.magasin,
  //       menu: '',
  //       index: index + 1,
  //     };
  //     if (
  //       line.total_matin != 0 &&
  //       line.total_midi != 0 &&
  //       line.total_soir != 0
  //     ) {
  //       line.date = new Date(year, month, line.index);
  //       line.jour = getDayName(year, month, line.index);
  //       linesInvolved.push(line);
  //     }
  //   });
  //   await this.consoService
  //     .manageData(linesInvolved)
  //     .then(() => result)
  //     .catch((err: NotFoundException) => { return new NotFoundException(err)});
  // }

  @Put(':id')
  async updateTable(
    @Param('id') id: string,
    @Body() data: UpdateMonthlyTableDto,
  ) {
    try {
      const result = await this.monthlyTableService.updateTable(id, data);
      const date = (await this.monthlyTableService.getTableMagData(id)).magasin
        .date;
      const { year, month } = getCurrentMonthAndYear(date.toString());

      const linesInvolved = [];

      for (let index = 0; index < data.totalMatin.length; index++) {
        const item = data.totalMatin[index];
        const line = {
          jour: '',
          total_matin: +item,
          total_midi: +data.totalMidi[index],
          total_soir: +data.totalSoir[index],
          date: new Date(),
          magasin: data.magasin,
          menu: '',
          index: index + 1,
        };

        if (
          line.total_matin !== 0 &&
          line.total_midi !== 0 &&
          line.total_soir !== 0
        ) {
          line.date = new Date(year, month, line.index); // Adjust month for zero-based index
          line.jour = getDayName(year, month, line.index); // Adjust month for zero-based index
          linesInvolved.push(line);
        }
      }

      await this.consoService.manageData(linesInvolved);
      return result;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new NotFoundException(err.getResponse());
      }
      throw new NotFoundException(err);
    }
  }

  @Get('magasin/:id')
  async findOne(@Param('id') id: string) {
    const result = this.monthlyTableService.findOneById(id);
    return result;
  }
}

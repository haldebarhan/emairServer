import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SurprimeService } from './surprime.service';
import { CreateSurprimeDto } from './dto/create-surprime.dto';
import { UpdateSurprimeDto } from './dto/update-surprime.dto';

@Controller('surprime')
export class SurprimeController {
  constructor(private readonly surprimeService: SurprimeService) {}

  @Post()
  async create(@Body() data: CreateSurprimeDto) {
    const result = await this.surprimeService.create(data);
    return result;
  }

  @Get(':year/:month')
  async filterByDate(
    @Param('year') year: number,
    @Param('month') month: number,
  ) {
    const results = await this.surprimeService.filterByDate(month, year);
    return results;
  }

  @Get(':id')
  async getone(@Param('id') id: string) {
    const result = this.surprimeService.getOne(id);
    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateSurprimeDto) {
    const result = await this.surprimeService.update(id, data);
    return result;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.surprimeService.delete(id);
  }
}

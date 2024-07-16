import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DiversService } from './divers.service';
import { CreateDiversDto } from './dto/create-divers.dto';
import { UpdateDiversDto } from './dto/update-divers.dto';

@Controller('divers')
export class DiversController {
  constructor(private readonly diversService: DiversService) {}

  @Post()
  async create(@Body() data: CreateDiversDto) {
    const result = await this.diversService.create(data);
    return result;
  }

  @Get()
  async getAll() {
    const results = await this.diversService.findAll();
    return results;
  }

  @Get('/filter/:year/:month')
  async filter(@Param('year') year: number, @Param('month') month: number) {
    const results = await this.diversService.filter(year, month);
    return results;
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const result = await this.diversService.getOne(id);
    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateDiversDto) {
    const result = await this.diversService.update(id, data);
    return result;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = this.diversService.delete(id);
    return result;
  }
}

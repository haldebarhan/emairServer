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
import { MagasinService } from 'src/magasin/magasin.service';

@Controller('divers')
export class DiversController {
  constructor(private readonly diversService: DiversService, private readonly magService: MagasinService) {}

  @Post()
  async create(@Body() data: CreateDiversDto) {
    const magasin = (await this.magService.findOne())._id.toString()
    const result = await this.diversService.create({...data, magasin});
    return result;
  }

  @Get()
  async getAll() {
    const results = await this.diversService.findAll();
    return results;
  }

  @Get('/filter/magasin/:id')
  async filter(@Param('id') magasinId: string) {
    const results = await this.diversService.filter(magasinId);
    return results;
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const result = await this.diversService.getOne(id);
    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateDiversDto) {
    const magasin = (await this.magService.findOne())._id.toString()
    const result = await this.diversService.update(id, {...data, magasin});
    return result;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = this.diversService.delete(id);
    return result;
  }
}

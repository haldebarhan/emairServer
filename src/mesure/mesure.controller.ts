import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MesureService } from './mesure.service';
import { CreateMesureDto } from './dto/create-mesure.dto';
import { Mesure } from 'src/schemas/mesure.schema';
import { Mesure as Imesure } from './interfaces/mesure.interface';

@Controller('mesure')
export class MesureController {
  constructor(private mesService: MesureService) {}

  @Post()
  async create(@Body() createMesureDto: CreateMesureDto) {
    const result = await this.mesService.create(createMesureDto);
    return result;
  }

  @Get()
  async findAll(): Promise<Mesure[]> {
    return this.mesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Imesure>{
    const query = await this.mesService.findById(id);
    const result: Imesure = {id: query._id.toString(), unite: query.unite}
    return result;
  }
}

import { Controller, Post, Body, Get } from '@nestjs/common';
import { DenreeService } from './denree.service';
import { CreateDenreeDto } from './dto/createDenree.dto';
import { Denree } from 'src/schemas/denree.schema';
import { MesureService } from 'src/mesure/mesure.service';

@Controller('denree')
export class DenreeController {
  constructor(
    private readonly denreeService: DenreeService,
    private mesService: MesureService,
  ) {}

  @Post()
  async create(@Body() createDenreeDto: CreateDenreeDto): Promise<Denree> {
    const mesure = await this.mesService.findById(createDenreeDto.mesure);
    if (!mesure) throw new Error('Unite de mesure inconnue');
    const result = await this.denreeService.create({
      ...createDenreeDto,
      mesure: mesure.id,
    });
    return result;
  }

  @Get()
  async findAll(): Promise<Denree[]> {
    return this.denreeService.findAll();
  }
}

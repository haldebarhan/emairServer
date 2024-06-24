import { Body, Controller, Get, Post } from '@nestjs/common';
import { MagasinService } from './magasin.service';
import { CreateMagasinDto } from './dto/create-magasin.dto';
import { Magasin } from 'src/schemas/magasin.schema';

@Controller('magasin')
export class MagasinController {
  constructor(private readonly magService: MagasinService) {}

  @Post()
  async create(@Body() createMagDto: CreateMagasinDto): Promise<Magasin> {
    const result = await this.magService.create(createMagDto);
    return result;
  }

  @Get()
  async findAll(): Promise<Magasin[]> {
    return this.magService.findAll();
  }


}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RecetteService } from './recette.service';
import { CreateRecetteDto } from './dto/create-recette.dto';

@Controller('recette')
export class RecetteController {
  constructor(private readonly recetteService: RecetteService) {}

  @Post()
  async create(@Body() createRecetteDto: CreateRecetteDto) {
    const result = await this.recetteService.createRecette(createRecetteDto);
    return result;
  }

  @Get()
  async getAllRecette() {
    const result = await this.recetteService.findAllRecette();
    return result;
  }

  @Get(':id')
  async GetOneRecette(@Param() id: string) {
    const result = await this.recetteService.findOneRecette(id);
    return result;
  }
}

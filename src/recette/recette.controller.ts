import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
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
  async GetOneRecette(@Param('id') id: string) {
    const result = await this.recetteService.findOneRecette(id);
    let ingredients = result.ingredients.map(ing => {
      return {denree: ing.denree.produit, ration: ing.ration, unite: ing.unite}
    })
    const data = {
      id: result._id,
      nomRecette: result.nomRecette,
      ingredients: ingredients,
      type: result.type.libelle
    };
    if(!data) throw new NotFoundException("Aucune donnée correspondante")
    return data;
  }

  @Patch(':id')
  async updateRecette(
    @Param('id') id: string,
    @Body() updateRecetteDto: Partial<CreateRecetteDto>,
  ) {
    return this.recetteService.updateOneRecette(id, updateRecetteDto);
  }

  @Delete(':id')
  async deleteRecette(@Param('id') id: string): Promise<void> {
    return this.recetteService.deleteRecette(id);
  }
}

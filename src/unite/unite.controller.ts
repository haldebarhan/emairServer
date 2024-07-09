import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UniteService } from './unite.service';
import { CreateUniteDto } from './dto/create-unite.dto';
import { UpdateUniteDto } from './dto/update-unite.dto';

@Controller('unite')
export class UniteController {
  constructor(private readonly uniteService: UniteService) {}

  @Post()
  async createUnite(@Body() createUniteDto: CreateUniteDto) {
    const result = await this.uniteService.create(createUniteDto);
    return result;
  }

  @Get()
  async getAllUnite() {
    const results = await this.uniteService.findAll();
    const data = results.map((result) => {
      return { id: result._id, nom: result.nom };
    });
    return data;
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const result = await this.uniteService.findOne(id);
    return result;
  }

  @Patch(':id')
  async updateUnite(
    @Param('id') id: string,
    @Body() updateUniteDto: UpdateUniteDto,
  ) {
    const result = await this.uniteService.update(id, updateUniteDto);
    return result;
  }

  @Delete(':id')
  async deleteUnite(@Param('id') id: string) {
    return this.uniteService.delete(id);
  }
}

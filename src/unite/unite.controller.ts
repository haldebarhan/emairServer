import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UniteService } from './unite.service';
import { CreateUniteDto } from './dto/create-unite.dto';

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
    const result = await this.uniteService.findAll();
    return result;
  }

  @Get(':id')
  async getOne(@Param() id: string) {
    const result = await this.uniteService.findOne(id);
    return result;
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ConsommationService } from './consommation.service';
import { CreateConsommationDto } from './dto/create-consommation.dto';
import { UpdateConsommationDto } from './dto/update-consommation.dto';

@Controller('consommation')
export class ConsommationController {
  constructor(private readonly consoService: ConsommationService) {}

  @Post()
  async createConso(@Body() createConsommationDto: CreateConsommationDto) {
    const result = await this.consoService.createConsommation(
      createConsommationDto,
    );
    return result;
  }

  @Get()
  async findConso() {
    const result = await this.consoService.findAll();
    return result;
  }

  @Get('/report/:year/:month')
  async filterConsoByMonth(
    @Param('year') year: number,
    @Param('month') month: number,
  ) {
    const result = await this.consoService.findByDate(year, month);
    return result;
  }

  @Get(':id')
  async getConsoById(@Param('id') id: string) {
    const result = this.consoService.findOne(id);
    return result;
  }

  @Patch(':id')
  async updateConso(
    @Param('id') id: string,
    @Body() update: UpdateConsommationDto,
  ) {
    const result = await this.consoService.updateConsommationById(id, update);
    return result;
  }
}

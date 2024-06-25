import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ConsommationService } from './consommation.service';
import { CreateConsommationDto } from './dto/create-consommation.dto';

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

  @Get()
  async findConsoByDate(@Query('date') date: string) {
    const result = await this.consoService.findByDate(date);
    return result;
  }
}

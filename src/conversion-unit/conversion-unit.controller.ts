import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConversionUnitService } from './conversion-unit.service';

@Controller('conversion')
export class ConversionUnitController {
  constructor(private readonly conversionService: ConversionUnitService) {}

  @Post()
  async create(@Body() data: { conversion: string }) {
    const result = await this.conversionService.create(data);
    return result;
  }

  @Get()
  async getAll() {
    const results = await this.conversionService.findAll();
    const data = results.map((result) => {
      return { id: result._id, uc: result.conversion };
    });
    return data;
  }
}

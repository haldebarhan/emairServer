import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  async createStock(@Body() createStockDto: CreateStockDto) {
    const result = await this.stockService.generateStock(createStockDto);
    return result;
  }

  @Get()
  async getAllStock() {
    return this.stockService.findAll();
  }

  @Get(':id')
  async getOneStock(@Param('id') id: string) {
    return this.stockService.findOne(id);
  }
}

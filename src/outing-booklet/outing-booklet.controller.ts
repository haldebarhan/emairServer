import { Controller, Get, Param } from '@nestjs/common';
import { OutingBookletService } from './outing-booklet.service';

@Controller('booklet')
export class OutingBookletController {
  constructor(private readonly bookService: OutingBookletService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.bookService.getOneByMagId(id);
    return result;
  }
}

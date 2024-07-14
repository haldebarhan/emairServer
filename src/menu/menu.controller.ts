import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { sortByJour } from 'src/helpers/day-sort.helper';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async createMenu(@Body() createMenuDto: CreateMenuDto) {
    const result = await this.menuService.create(createMenuDto);
    return result;
  }

  @Get()
  async getAllMenu() {
    const result = await this.menuService.findAll();
    const sortedResult = sortByJour(result);
    return sortedResult;
  }
  @Get('search/')
  async getMenuByDayName(@Query('query') query: string) {
    const result = await this.menuService.findMenuByDay(query);
    return result;
  }

  @Get(':id')
  async getOneMenu(@Param('id') id: string) {
    const result = await this.menuService.findOne(id);
    return result;
  }

 
  @Patch(':id')
  async updateMenu(
    @Param('id') id: string,
    @Body() updateMenuDto: UpdateMenuDto,
  ) {
    const result = await this.menuService.updateMenu(id, updateMenuDto);
    return result;
  }
  @Delete(':id')
  async deleteMenu(@Param('id') id: string) {
    return this.menuService.deleteMenu(id);
  }
}

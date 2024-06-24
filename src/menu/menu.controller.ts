import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async createMenu(@Body() createMenuDto: CreateMenuDto) {
    const result = await this.menuService.create(createMenuDto);
    return result;
  }

  @Get()
  async GetAllMenu() {
    const result = await this.menuService.findAll();
    return result;
  }

  @Get(':id')
  async GetOneMenu(@Param() id: string) {
    const result = await this.menuService.findOne(id);
    return result;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Menu } from 'src/schemas/menu.schema';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu.name) private readonly menuModel: Model<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    const query = new this.menuModel(createMenuDto);
    return query.save();
  }

  async findAll() {
    const query = this.menuModel
      .find()
      .populate('petit_dejeuner')
      .populate('hors_doeuvre')
      .populate('dejeuner')
      .populate('dessert')
      .populate('diner')
      .exec();
    return query;
  }

  async findOne(menuId: string) {
    const query = this.menuModel
      .findById(menuId)
      .populate('petit_dejeuner')
      .populate('hors_doeuvre')
      .populate('dejeuner')
      .populate('dessert')
      .populate('diner')
      .exec();
    return query;
  }

  async updateMenu(menuId: string, updateMenuDto: UpdateMenuDto) {
    const query = await this.menuModel
      .findByIdAndUpdate(menuId, updateMenuDto, { new: true })
      .exec();
    if (!query) throw new NotFoundException('Menu non Trouvé');
    return query;
  }

  async deleteMenu(menuId: string) {
    const query = await this.menuModel.findByIdAndDelete(menuId).exec();
    if (!query) throw new NotFoundException('menu non trouvé');
  }
}

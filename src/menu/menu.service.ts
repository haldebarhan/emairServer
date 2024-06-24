import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Menu } from 'src/schemas/menu.schema';
import { CreateMenuDto } from './dto/create-menu.dto';

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
    const query = this.menuModel.find().exec();
    return query;
  }

  async findOne(menuId: string) {
    const query = this.menuModel.findById(menuId).exec();
    return query;
  }
}

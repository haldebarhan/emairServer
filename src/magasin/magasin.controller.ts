import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MagasinService } from './magasin.service';
import { CreateMagasinDto } from './dto/create-magasin.dto';
import { Magasin } from 'src/schemas/magasin.schema';
import { DenreeService } from 'src/denree/denree.service';

@Controller('magasin')
export class MagasinController {
  constructor(
    private readonly magService: MagasinService,
    private readonly denreeService: DenreeService,
  ) {}

  @Post()
  async create(@Body() body: { year: string; month: string }) {
    const results = await this.magService.findAll();
    if (results.length == 0) {
      const date = new Date(`${body.year}-${body.month}-01T00:00:00Z`);
      const denrees = await this.denreeService.findAll();
      const stock = denrees.map((denree: any) => {
        return { denree: denree._id };
      });
      const data: CreateMagasinDto = { date, stock };
      const result = await this.magService.create(data);
      return result;
    }
  }

  @Get()
  async findAll() {
    const results = await this.magService.findAll();
    if (results.length != 0) {
      const result = results[0];
      const stock = result.stock.map((denree) => {
        return {
          produit: denree.denree.produit,
          quantite: denree.quantite,
          conso: denree.conso,
          appro: denree.appro,
          balance: denree.balance,
          prix: denree.denree.pu,
        };
      });
      const data = { id: result._id, date: result.date, stock: stock };
      return data;
    } else {
      return results;
    }
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const result = await this.magService.getOne(id);
    const stock = result.stock.map((denree) => {
      return {
        produit: denree.denree.produit,
        quantite: denree.quantite,
        conso: denree.conso,
        appro: denree.appro,
        balance: denree.balance,
        prix: denree.denree.pu,
        um: denree.denree.mesure,
      };
    });
    const data = {
      id: result._id,
      date: result.date,
      stock: stock,
      completed: result.complete,
    };
    return data;
  }
}

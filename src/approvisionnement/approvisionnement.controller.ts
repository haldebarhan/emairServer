import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MagasinService } from 'src/magasin/magasin.service';
import { ApprovisionnementService } from './approvisionnement.service';
import { CreateApproDto } from './dto/create-appro.dto';
import { IAppro } from 'src/models/Approvisionnement';
import { DenreeService } from 'src/denree/denree.service';
import { OutingBookletService } from 'src/outing-booklet/outing-booklet.service';
import { getCurrentMonthAndYear } from 'src/helpers/getCurrentMonthAndYear';
import { getDayInMonth } from 'src/helpers/dayInmonth.helper';
import { getDay } from 'src/helpers/get-day';
import { CreateOutingBookletDto } from 'src/outing-booklet/dto/create-outing-booklet.dto';
import { UpdateOutingBookletDto } from 'src/outing-booklet/dto/update-outing-booklet.dto';

@Controller('appro')
export class ApprovisionnementController {
  constructor(
    private readonly magasinService: MagasinService,
    private readonly approService: ApprovisionnementService,
    private readonly denreeService: DenreeService,
    private readonly bookletService: OutingBookletService,
  ) {}

  @Post()
  async create(@Body() createApproDto: CreateApproDto) {
    await this.approService.createAppro(createApproDto);
    const denrees = await this.denreeService.findAll();
    const products = [];
    createApproDto.produits.forEach((p) => {
      const finded = denrees.find((d) => d.produit === p.denreeName);
      products.push({
        denree: finded,
        quantite: p.quantite,
        denreeId: p.denree,
      });
    });
    const data: IAppro = {
      date: createApproDto.date,
      magasin: createApproDto.magasin,
      produits: products,
    };

    const create = await this.magasinService.updateStockBySupply(data);
    const booklet = await this.bookletService.getOneByMagId(
      createApproDto.magasin,
    );
    const magasin = await this.magasinService.getOne(createApproDto.magasin);

    if (!booklet) {
      this.createBookData(createApproDto, magasin);
    } else {
      const booklet_products = booklet.carnet;
      const appro_products = createApproDto.produits;
      const magasin_date = magasin.date;
      const { year, month } = getCurrentMonthAndYear(
        magasin_date.toISOString(),
      );
      const dayInMonth = getDayInMonth(month + 1, year);
      const appro_date_index = getDay(createApproDto.date.toString());
      const index = appro_date_index - 1;

      appro_products.forEach((product) => {
        let find = booklet_products.find(
          (p) => p.produit == product.denreeName,
        );
        if (find) {
          find.appro[index] += product.quantite;
          find.balance[index] = find.appro[index] - find.conso[index];
        } else {
          find = {
            produit: product.denreeName,
            appro: Array<number>(dayInMonth).fill(0),
            conso: Array<number>(dayInMonth).fill(0),
            balance: Array<number>(dayInMonth).fill(0),
            existant: 0,
          };
          find.appro[index] += product.quantite;
          booklet_products.push(find);
        }
      });

      const updates: UpdateOutingBookletDto = {
        magasin: magasin._id.toString(),
        carnet: booklet_products,
      };

      await this.bookletService.update(booklet._id.toString(), updates);
    }
    return create;
  }

  @Get('/data/:year/:month')
  async filterSupplies(
    @Param('year') year: number,
    @Param('month') month: number,
  ) {
    const result = await this.approService.fiterSupplies(year, month);
    return result;
  }

  @Get(':id')
  async filterByMagId(@Param('id') id: string) {
    const results = await this.approService.filterByMagId(id);
    return results;
  }

  async createBookData(data: CreateApproDto, magasin: any) {
    // const magasin = await this.magasinService.getOne(data.magasin);
    let magasin_date = magasin.date;
    let magasin_stock = magasin.stock;
    const { year, month } = getCurrentMonthAndYear(magasin_date.toISOString());
    const dayInMonth = getDayInMonth(month + 1, year);
    const appro_date_index = getDay(data.date.toString());

    let total_matin: number[] = Array(dayInMonth).fill(0);
    let total_midi: number[] = Array(dayInMonth).fill(0);
    let total_soir: number[] = Array(dayInMonth).fill(0);
    const carnet: {
      produit: string;
      appro: Array<number>;
      conso: Array<number>;
      balance: Array<number>;
      existant: number;
      d_appro: number;
      d_conso: number;
      d_balance: number;
    }[] = magasin_stock.map((denree) => {
      const find = data.produits.find(
        (product) => product.denreeName == denree.denree.produit,
      );
      return {
        produit: denree.denree.produit,
        existant: denree.quantite,
        appro: Array<number>(dayInMonth).fill(0),
        conso: Array<number>(dayInMonth).fill(0),
        balance: Array<number>(dayInMonth).fill(0),
        d_appro: find.quantite,
        d_conso: 0,
        d_balance: 0,
      };
    });
    const index = appro_date_index - 1;
    for (const [_, item] of carnet.entries()) {
      item.appro[index] = item.d_appro;
      (item.conso[index] = item.d_conso),
        (item.balance[index] +=
          item.existant + item.d_appro - item.conso[index]);
    }

    const outingBooklet_data: CreateOutingBookletDto = {
      total_matin: total_matin,
      total_midi: total_midi,
      total_soir: total_soir,
      carnet: carnet,
      magasin: magasin._id.toString(),
    };

    await this.bookletService.create(outingBooklet_data);
  }
}

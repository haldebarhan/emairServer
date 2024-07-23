import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MagasinService } from 'src/magasin/magasin.service';
import { ApprovisionnementService } from './approvisionnement.service';
import { CreateApproDto } from './dto/create-appro.dto';
import { IAppro } from 'src/models/Approvisionnement';

@Controller('appro')
export class ApprovisionnementController {
  constructor(
    private readonly magasinService: MagasinService,
    private readonly approService: ApprovisionnementService,
  ) {}

  @Post()
  async create(@Body() createApproDto: CreateApproDto) {
    const result = await this.approService.createAppro(createApproDto);
    const data: IAppro = {
      date: createApproDto.date,
      magasin: createApproDto.magasin,
      produits: createApproDto.produits,
    };
    const create = await this.magasinService.updateStockBySupply(data);
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
    const results  = await this.approService.filterByMagId(id)
    return results
  }
}

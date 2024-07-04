import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { DenreeService } from './denree.service';
import { CreateDenreeDto } from './dto/createDenree.dto';
import { Denree } from 'src/schemas/denree.schema';
import { MesureService } from 'src/mesure/mesure.service';
import { UpdateDenreeDto } from './dto/updateDenree.dto';

@Controller('denree')
export class DenreeController {
  constructor(
    private readonly denreeService: DenreeService,
    private mesService: MesureService,
  ) {}

  @Post()
  async create(@Body() createDenreeDto: CreateDenreeDto): Promise<Denree> {
    const mesure = await this.mesService.findById(createDenreeDto.mesure);
    if (!mesure) throw new Error('Unite de mesure inconnue');
    const result = await this.denreeService.create({
      ...createDenreeDto,
      mesure: mesure.id,
    });
    return result;
  }

  @Get()
  async findAll() {
    const denrees = await this.denreeService.findAll();
    return denrees.map((product) => ({
      id: product._id,
      product: product.produit,
      mesure: product.mesure.unite,
    }));
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    const result = await this.denreeService.findOne(id);
    const data = {
      id: result._id,
      produit: result.produit,
      mesure: result.mesure,
    };
    return data;
  }

  @Put(':id')
  async updateDenree(
    @Param('id') id: string,
    @Body() updateDenreeDto: UpdateDenreeDto,
  ) {
    return this.denreeService.updateDenree(id, updateDenreeDto);
  }

  @Delete(':id')
  async deleteDenree(@Param('id') id: string): Promise<void> {
    return this.denreeService.deleteDenree(id);
  }
}

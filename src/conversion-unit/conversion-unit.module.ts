import { Module } from '@nestjs/common';
import { ConversionUnitController } from './conversion-unit.controller';
import { ConversionUnitService } from './conversion-unit.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversionUnit, ConversionUnitSchema } from 'src/schemas/conversion-unit.schema';

@Module({
  controllers: [ConversionUnitController],
  providers: [ConversionUnitService],
  imports: [MongooseModule.forFeature([{name: ConversionUnit.name, schema: ConversionUnitSchema}])]
})
export class ConversionUnitModule {}

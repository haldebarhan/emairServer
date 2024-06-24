import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Stock, StockSchema } from 'src/schemas/stock.schema';
import { MagasinModule } from 'src/magasin/magasin.module';
import { DenreeModule } from 'src/denree/denree.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }]),
    MagasinModule,
    DenreeModule
  ],
  providers: [StockService],
  controllers: [StockController],
})
export class StockModule {}

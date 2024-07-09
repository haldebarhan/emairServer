import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MagasinModule } from './magasin/magasin.module';
import { MesureModule } from './mesure/mesure.module';
import { DenreeModule } from './denree/denree.module';
import { StockModule } from './stock/stock.module';
import { UniteModule } from './unite/unite.module';
import { MenuModule } from './menu/menu.module';
import { RecetteModule } from './recette/recette.module';
import { ConsommationModule } from './consommation/consommation.module';
import { ConversionUnitModule } from './conversion-unit/conversion-unit.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/ordiDB'), MagasinModule, MesureModule, DenreeModule, StockModule, UniteModule, MenuModule, RecetteModule, ConsommationModule, ConversionUnitModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

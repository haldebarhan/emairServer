import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MagasinModule } from './magasin/magasin.module';
import { MesureModule } from './mesure/mesure.module';
import { DenreeModule } from './denree/denree.module';
import { UniteModule } from './unite/unite.module';
import { MenuModule } from './menu/menu.module';
import { RecetteModule } from './recette/recette.module';
import { ConsommationModule } from './consommation/consommation.module';
import { ConversionUnitModule } from './conversion-unit/conversion-unit.module';
import { ApprovisionnementModule } from './approvisionnement/approvisionnement.module';
import { DailyOutputModule } from './daily-output/daily-output.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/ordiDB'), MagasinModule, MesureModule, DenreeModule, UniteModule, MenuModule, RecetteModule, ConsommationModule, ConversionUnitModule, ApprovisionnementModule, DailyOutputModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

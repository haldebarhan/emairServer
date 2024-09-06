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
import { SurprimeModule } from './surprime/surprime.module';
import { DiversModule } from './divers/divers.module';
import { MonthlyStatusModule } from './monthly-status/monthly-status.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MonthlyTableModule } from './monthly-table/monthly-table.module';
import { OutingBookletModule } from './outing-booklet/outing-booklet.module';
import { RecetteTypeModule } from './recette-type/recette-type.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/version2'),
    MagasinModule,
    MesureModule,
    DenreeModule,
    UniteModule,
    MenuModule,
    RecetteModule,
    ConsommationModule,
    ConversionUnitModule,
    ApprovisionnementModule,
    DailyOutputModule,
    SurprimeModule,
    DiversModule,
    MonthlyStatusModule,
    MonthlyTableModule,
    OutingBookletModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/ang-test/browser')
    }),
    RecetteTypeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

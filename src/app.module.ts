import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MagasinModule } from './magasin/magasin.module';
import { MesureModule } from './mesure/mesure.module';
import { DenreeModule } from './denree/denree.module';
import { StockModule } from './stock/stock.module';
import { UniteModule } from './unite/unite.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), MagasinModule, MesureModule, DenreeModule, StockModule, UniteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

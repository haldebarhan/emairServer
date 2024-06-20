import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MagasinModule } from './magasin/magasin.module';
import { MesureModule } from './mesure/mesure.module';
import { DenreeModule } from './denree/denree.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), MagasinModule, MesureModule, DenreeModule, StockModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

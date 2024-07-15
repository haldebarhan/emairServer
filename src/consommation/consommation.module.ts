import { Module } from '@nestjs/common';
import { ConsommationController } from './consommation.controller';
import { ConsommationService } from './consommation.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Consommation,
  ConsommationSchema,
} from 'src/schemas/consommation.schema';
import { DenreeModule } from 'src/denree/denree.module';
import { DailyOutputModule } from 'src/daily-output/daily-output.module';
import { MagasinModule } from 'src/magasin/magasin.module';

@Module({
  controllers: [ConsommationController],
  providers: [ConsommationService],
  imports: [
    MongooseModule.forFeature([
      { name: Consommation.name, schema: ConsommationSchema },
    ]),
    DenreeModule,
    DailyOutputModule,
    MagasinModule
  ],
})
export class ConsommationModule {}

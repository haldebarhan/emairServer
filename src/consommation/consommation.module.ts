import { forwardRef, Module } from '@nestjs/common';
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
import { MenuModule } from 'src/menu/menu.module';
import { OutingBookletModule } from 'src/outing-booklet/outing-booklet.module';
import { ApprovisionnementModule } from 'src/approvisionnement/approvisionnement.module';

@Module({
  controllers: [ConsommationController],
  providers: [ConsommationService],
  imports: [
    MongooseModule.forFeature([
      { name: Consommation.name, schema: ConsommationSchema },
    ]),
    forwardRef(() => DenreeModule),
    DailyOutputModule,
    forwardRef(() => MagasinModule),
    forwardRef(() => MenuModule),
    OutingBookletModule,
    forwardRef(() => ApprovisionnementModule)
  ],
  exports: [ConsommationService],
})
export class ConsommationModule {}

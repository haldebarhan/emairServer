import { Module } from '@nestjs/common';
import { MonthlyStatusController } from './monthly-status.controller';
import { MonthlyStatusService } from './monthly-status.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MonthlyStatusSchema,
  MonthlyStatus,
} from 'src/schemas/monthly-status.schema';
import { MagasinModule } from 'src/magasin/magasin.module';
import { DenreeModule } from 'src/denree/denree.module';
import { DailyOutputModule } from 'src/daily-output/daily-output.module';
import { ConsommationModule } from 'src/consommation/consommation.module';

@Module({
  controllers: [MonthlyStatusController],
  providers: [MonthlyStatusService],
  imports: [
    MongooseModule.forFeature([
      { name: MonthlyStatus.name, schema: MonthlyStatusSchema },
    ]),
    MagasinModule,
    DenreeModule,
    DailyOutputModule,
    ConsommationModule,
  ],
})
export class MonthlyStatusModule {}

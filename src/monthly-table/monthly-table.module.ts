import { forwardRef, Module } from '@nestjs/common';
import { MonthlyTableController } from './monthly-table.controller';
import { MonthlyTableService } from './monthly-table.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MonthlyTable, MonthlyTableSchema } from 'src/schemas/monthly-table.schema';
import { MenuModule } from 'src/menu/menu.module';
import { MagasinModule } from 'src/magasin/magasin.module';
import { ConsommationModule } from 'src/consommation/consommation.module';

@Module({
  controllers: [MonthlyTableController],
  providers: [MonthlyTableService],
  imports: [MongooseModule.forFeature([{name: MonthlyTable.name, schema: MonthlyTableSchema}]), MenuModule, forwardRef(() => MagasinModule), ConsommationModule],
  exports: [MonthlyTableService]
})
export class MonthlyTableModule {}

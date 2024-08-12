import { Module } from '@nestjs/common';
import { MonthlyTableController } from './monthly-table.controller';
import { MonthlyTableService } from './monthly-table.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MonthlyTable, MonthlyTableSchema } from 'src/schemas/monthly-table.schema';

@Module({
  controllers: [MonthlyTableController],
  providers: [MonthlyTableService],
  imports: [MongooseModule.forFeature([{name: MonthlyTable.name, schema: MonthlyTableSchema}])],
  exports: [MonthlyTableService]
})
export class MonthlyTableModule {}

import { Module } from '@nestjs/common';
import { DailyOutputController } from './daily-output.controller';
import { DailyOutputService } from './daily-output.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DaiLyOutput, DaiLyOutputSchema } from 'src/schemas/daily-output.schema';

@Module({
  controllers: [DailyOutputController],
  providers: [DailyOutputService],
  imports:[MongooseModule.forFeature([{name: DaiLyOutput.name, schema: DaiLyOutputSchema}])],
  exports: [DailyOutputService]
})
export class DailyOutputModule {}

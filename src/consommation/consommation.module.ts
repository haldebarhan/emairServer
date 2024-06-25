import { Module } from '@nestjs/common';
import { ConsommationController } from './consommation.controller';
import { ConsommationService } from './consommation.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Consommation,
  ConsommationSchema,
} from 'src/schemas/consommation.schema';

@Module({
  controllers: [ConsommationController],
  providers: [ConsommationService],
  imports: [
    MongooseModule.forFeature([
      { name: Consommation.name, schema: ConsommationSchema },
    ]),
  ],
})
export class ConsommationModule {}

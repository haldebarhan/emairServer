import { Module } from '@nestjs/common';
import { MesureService } from './mesure.service';
import { MesureController } from './mesure.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Mesure, MesureSchema } from 'src/schemas/mesure.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mesure.name, schema: MesureSchema }]),
  ],
  providers: [MesureService],
  controllers: [MesureController],
  exports: [MesureService],
})
export class MesureModule {}

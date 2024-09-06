import { Module } from '@nestjs/common';
import { RecetteTypeController } from './recette-type.controller';
import { RecetteTypeService } from './recette-type.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RecetteType,
  RecetteTypeSchema,
} from 'src/schemas/recette-type.schema';

@Module({
  controllers: [RecetteTypeController],
  providers: [RecetteTypeService],
  imports: [
    MongooseModule.forFeature([
      { name: RecetteType.name, schema: RecetteTypeSchema },
    ]),
  ],
  exports: [RecetteTypeService],
})
export class RecetteTypeModule {}

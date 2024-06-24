import { Module } from '@nestjs/common';
import { RecetteController } from './recette.controller';
import { RecetteService } from './recette.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Recette, RecetteSchema } from 'src/schemas/recette.schema';

@Module({
  controllers: [RecetteController],
  providers: [RecetteService],
  imports: [MongooseModule.forFeature([{name: Recette.name, schema: RecetteSchema}])]
})
export class RecetteModule {}

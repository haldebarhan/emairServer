import { Module } from '@nestjs/common';
import { UniteController } from './unite.controller';
import { UniteService } from './unite.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Unite, UniteSchema } from 'src/schemas/unite.schema';

@Module({
  controllers: [UniteController],
  providers: [UniteService],
  imports: [MongooseModule.forFeature([{name: Unite.name, schema: UniteSchema}])],
  exports: [UniteService]
})
export class UniteModule {}

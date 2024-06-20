import { Module } from '@nestjs/common';
import { DenreeService } from './denree.service';
import { DenreeController } from './denree.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Denree, DenreeSchema } from 'src/schemas/denree.schema';
import { MesureModule } from 'src/mesure/mesure.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Denree.name, schema: DenreeSchema }]),
    MesureModule
  ],
  providers: [DenreeService],
  controllers: [DenreeController],
})
export class DenreeModule {}

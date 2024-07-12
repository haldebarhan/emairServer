import { Module } from '@nestjs/common';
import { MagasinService } from './magasin.service';
import { MagasinController } from './magasin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Magasin, MagasinSchema } from 'src/schemas/magasin.schema';
import { DenreeModule } from 'src/denree/denree.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Magasin.name, schema: MagasinSchema }]),
    DenreeModule,
  ],
  providers: [MagasinService],
  controllers: [MagasinController],
  exports: [MagasinService],
})
export class MagasinModule {}

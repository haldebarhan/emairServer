import { Module } from '@nestjs/common';
import { SurprimeController } from './surprime.controller';
import { SurprimeService } from './surprime.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Surprime, SurprimeSchema } from 'src/schemas/surprime.schema';

@Module({
  controllers: [SurprimeController],
  providers: [SurprimeService],
  imports: [
    MongooseModule.forFeature([
      { name: Surprime.name, schema: SurprimeSchema },
    ]),
  ],
})
export class SurprimeModule {}

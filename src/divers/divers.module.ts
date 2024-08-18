import { forwardRef, Module } from '@nestjs/common';
import { DiversController } from './divers.controller';
import { DiversService } from './divers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Divers, DiversSchema } from 'src/schemas/divers.schema';
import { MagasinModule } from 'src/magasin/magasin.module';

@Module({
  controllers: [DiversController],
  providers: [DiversService],
  imports: [
    MongooseModule.forFeature([{ name: Divers.name, schema: DiversSchema }]),
    forwardRef(() => MagasinModule)
  ],
  exports: [DiversService]
})
export class DiversModule {}

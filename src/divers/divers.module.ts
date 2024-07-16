import { Module } from '@nestjs/common';
import { DiversController } from './divers.controller';
import { DiversService } from './divers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Divers, DiversSchema } from 'src/schemas/divers.schema';

@Module({
  controllers: [DiversController],
  providers: [DiversService],
  imports: [
    MongooseModule.forFeature([{ name: Divers.name, schema: DiversSchema }]),
  ],
})
export class DiversModule {}

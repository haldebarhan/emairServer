import { Module } from '@nestjs/common';
import { ApprovisionnementController } from './approvisionnement.controller';
import { ApprovisionnementService } from './approvisionnement.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ApproSchema,
  Approvisionnement,
} from 'src/schemas/approvisionnement.schema';
import { MagasinModule } from 'src/magasin/magasin.module';

@Module({
  controllers: [ApprovisionnementController],
  providers: [ApprovisionnementService],
  imports: [
    MongooseModule.forFeature([
      { name: Approvisionnement.name, schema: ApproSchema },
    ]),
    MagasinModule
  ],
})
export class ApprovisionnementModule {}

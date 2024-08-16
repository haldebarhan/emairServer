import { forwardRef, Module } from '@nestjs/common';
import { ApprovisionnementController } from './approvisionnement.controller';
import { ApprovisionnementService } from './approvisionnement.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ApproSchema,
  Approvisionnement,
} from 'src/schemas/approvisionnement.schema';
import { MagasinModule } from 'src/magasin/magasin.module';
import { DenreeModule } from 'src/denree/denree.module';
import { OutingBookletModule } from 'src/outing-booklet/outing-booklet.module';

@Module({
  controllers: [ApprovisionnementController],
  providers: [ApprovisionnementService],
  imports: [
    MongooseModule.forFeature([
      { name: Approvisionnement.name, schema: ApproSchema },
    ]),
    forwardRef(() => MagasinModule),
    forwardRef(() => DenreeModule),
    forwardRef(() => OutingBookletModule)
  ],
  exports: [ApprovisionnementService],
})
export class ApprovisionnementModule {}

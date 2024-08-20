import { forwardRef, Module } from '@nestjs/common';
import { MagasinService } from './magasin.service';
import { MagasinController } from './magasin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Magasin, MagasinSchema } from 'src/schemas/magasin.schema';
import { DenreeModule } from 'src/denree/denree.module';
import { MonthlyTableModule } from 'src/monthly-table/monthly-table.module';
import { UniteModule } from 'src/unite/unite.module';
import { OutingBookletModule } from 'src/outing-booklet/outing-booklet.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Magasin.name, schema: MagasinSchema }]),
    DenreeModule,
    forwardRef(() => MonthlyTableModule),
    forwardRef(() => OutingBookletModule),
    UniteModule
  ],
  providers: [MagasinService],
  controllers: [MagasinController],
  exports: [MagasinService],
})
export class MagasinModule {}

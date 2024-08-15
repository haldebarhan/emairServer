import { Module } from '@nestjs/common';
import { OutingBookletController } from './outing-booklet.controller';
import { OutingBookletService } from './outing-booklet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OutingBooklet, OutingBookletSchema } from 'src/schemas/outing-bouklet.schema';

@Module({
  controllers: [OutingBookletController],
  providers: [OutingBookletService],
  exports: [OutingBookletService],
  imports: [MongooseModule.forFeature([{name: OutingBooklet.name, schema: OutingBookletSchema}])]
})
export class OutingBookletModule {}

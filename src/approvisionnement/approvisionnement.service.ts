import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Approvisionnement } from 'src/schemas/approvisionnement.schema';
import { CreateApproDto } from './dto/create-appro.dto';

@Injectable()
export class ApprovisionnementService {
  constructor(
    @InjectModel(Approvisionnement.name)
    private readonly approModel: Model<Approvisionnement>,
  ) {}

  async createAppro(data: CreateApproDto) {
    const query = new this.approModel(data);
    return query.save();
  }
}

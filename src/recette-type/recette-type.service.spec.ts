import { Test, TestingModule } from '@nestjs/testing';
import { RecetteTypeService } from './recette-type.service';

describe('RecetteTypeService', () => {
  let service: RecetteTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecetteTypeService],
    }).compile();

    service = module.get<RecetteTypeService>(RecetteTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

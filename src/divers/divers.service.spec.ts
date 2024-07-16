import { Test, TestingModule } from '@nestjs/testing';
import { DiversService } from './divers.service';

describe('DiversService', () => {
  let service: DiversService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiversService],
    }).compile();

    service = module.get<DiversService>(DiversService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

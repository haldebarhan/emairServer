import { Test, TestingModule } from '@nestjs/testing';
import { ConsommationService } from './consommation.service';

describe('ConsommationService', () => {
  let service: ConsommationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsommationService],
    }).compile();

    service = module.get<ConsommationService>(ConsommationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

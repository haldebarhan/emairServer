import { Test, TestingModule } from '@nestjs/testing';
import { SurprimeService } from './surprime.service';

describe('SurprimeService', () => {
  let service: SurprimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurprimeService],
    }).compile();

    service = module.get<SurprimeService>(SurprimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

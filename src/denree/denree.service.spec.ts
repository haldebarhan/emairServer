import { Test, TestingModule } from '@nestjs/testing';
import { DenreeService } from './denree.service';

describe('DenreeService', () => {
  let service: DenreeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DenreeService],
    }).compile();

    service = module.get<DenreeService>(DenreeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { DailyOutputService } from './daily-output.service';

describe('DailyOutputService', () => {
  let service: DailyOutputService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyOutputService],
    }).compile();

    service = module.get<DailyOutputService>(DailyOutputService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

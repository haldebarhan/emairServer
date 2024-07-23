import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyStatusService } from './monthly-status.service';

describe('MonthlyStatusService', () => {
  let service: MonthlyStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonthlyStatusService],
    }).compile();

    service = module.get<MonthlyStatusService>(MonthlyStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

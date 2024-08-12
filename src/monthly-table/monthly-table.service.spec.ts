import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyTableService } from './monthly-table.service';

describe('MonthlyTableService', () => {
  let service: MonthlyTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonthlyTableService],
    }).compile();

    service = module.get<MonthlyTableService>(MonthlyTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

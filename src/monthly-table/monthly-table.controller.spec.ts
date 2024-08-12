import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyTableController } from './monthly-table.controller';

describe('MonthlyTableController', () => {
  let controller: MonthlyTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonthlyTableController],
    }).compile();

    controller = module.get<MonthlyTableController>(MonthlyTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

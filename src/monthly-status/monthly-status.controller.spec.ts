import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyStatusController } from './monthly-status.controller';

describe('MonthlyStatusController', () => {
  let controller: MonthlyStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonthlyStatusController],
    }).compile();

    controller = module.get<MonthlyStatusController>(MonthlyStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

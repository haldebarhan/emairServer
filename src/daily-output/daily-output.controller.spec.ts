import { Test, TestingModule } from '@nestjs/testing';
import { DailyOutputController } from './daily-output.controller';

describe('DailyOutputController', () => {
  let controller: DailyOutputController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyOutputController],
    }).compile();

    controller = module.get<DailyOutputController>(DailyOutputController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

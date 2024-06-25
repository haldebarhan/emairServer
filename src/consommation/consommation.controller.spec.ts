import { Test, TestingModule } from '@nestjs/testing';
import { ConsommationController } from './consommation.controller';

describe('ConsommationController', () => {
  let controller: ConsommationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsommationController],
    }).compile();

    controller = module.get<ConsommationController>(ConsommationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

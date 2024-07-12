import { Test, TestingModule } from '@nestjs/testing';
import { ApprovisionnementController } from './approvisionnement.controller';

describe('ApprovisionnementController', () => {
  let controller: ApprovisionnementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApprovisionnementController],
    }).compile();

    controller = module.get<ApprovisionnementController>(ApprovisionnementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

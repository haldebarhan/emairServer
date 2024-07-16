import { Test, TestingModule } from '@nestjs/testing';
import { SurprimeController } from './surprime.controller';

describe('SurprimeController', () => {
  let controller: SurprimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurprimeController],
    }).compile();

    controller = module.get<SurprimeController>(SurprimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

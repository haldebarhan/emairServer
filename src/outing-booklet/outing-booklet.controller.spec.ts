import { Test, TestingModule } from '@nestjs/testing';
import { OutingBookletController } from './outing-booklet.controller';

describe('OutingBookletController', () => {
  let controller: OutingBookletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OutingBookletController],
    }).compile();

    controller = module.get<OutingBookletController>(OutingBookletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

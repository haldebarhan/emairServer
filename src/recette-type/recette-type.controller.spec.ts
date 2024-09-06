import { Test, TestingModule } from '@nestjs/testing';
import { RecetteTypeController } from './recette-type.controller';

describe('RecetteTypeController', () => {
  let controller: RecetteTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecetteTypeController],
    }).compile();

    controller = module.get<RecetteTypeController>(RecetteTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

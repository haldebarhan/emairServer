import { Test, TestingModule } from '@nestjs/testing';
import { ConversionUnitController } from './conversion-unit.controller';

describe('ConversionUnitController', () => {
  let controller: ConversionUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConversionUnitController],
    }).compile();

    controller = module.get<ConversionUnitController>(ConversionUnitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

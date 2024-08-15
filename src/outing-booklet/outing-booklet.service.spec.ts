import { Test, TestingModule } from '@nestjs/testing';
import { OutingBookletService } from './outing-booklet.service';

describe('OutingBookletService', () => {
  let service: OutingBookletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OutingBookletService],
    }).compile();

    service = module.get<OutingBookletService>(OutingBookletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

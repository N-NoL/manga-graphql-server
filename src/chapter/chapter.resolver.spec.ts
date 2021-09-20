import { Test, TestingModule } from '@nestjs/testing';
import { ChapterResolver } from './chapter.resolver';
import { ChapterService } from './chapter.service';

describe('ChapterResolver', () => {
  let resolver: ChapterResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChapterResolver, ChapterService],
    }).compile();

    resolver = module.get<ChapterResolver>(ChapterResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

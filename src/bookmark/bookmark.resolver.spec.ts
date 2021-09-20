import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkResolver } from './bookmark.resolver';
import { BookmarkService } from './bookmark.service';

describe('BookmarkResolver', () => {
  let resolver: BookmarkResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookmarkResolver, BookmarkService],
    }).compile();

    resolver = module.get<BookmarkResolver>(BookmarkResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

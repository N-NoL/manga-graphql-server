import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ChapterService } from './chapter.service';
import { Chapter } from './entities/chapter.entity';
import { CreateChapterInput } from './dto/create-chapter.input';
import { UpdateChapterInput } from './dto/update-chapter.input';

@Resolver(() => Chapter)
export class ChapterResolver {
  constructor(private readonly chapterService: ChapterService) {}

  @Mutation(() => Chapter)
  createChapter(@Args('data') data: CreateChapterInput) {
    return this.chapterService.create(data);
  }

  @Query(() => [Chapter], { name: 'chapters' })
  findAll(@Args('mangaId', { type: () => ID }) mangaId: string) {
    return this.chapterService.findAll(mangaId);
  }

  @Query(() => Chapter, { name: 'chapter' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.chapterService.findOne(id);
  }

  @Mutation(() => Chapter)
  updateChapter(@Args('data') data: UpdateChapterInput) {
    return this.chapterService.update(data);
  }

  @Mutation(() => Chapter)
  removeChapter(@Args('id', { type: () => ID }) id: string) {
    return this.chapterService.remove(id);
  }
}

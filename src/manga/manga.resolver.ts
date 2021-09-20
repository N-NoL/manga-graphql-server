import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { MangaService } from './manga.service';
import { Manga } from './entities/manga.entity';
import { CreateMangaInput } from './dto/create-manga.input';
import { UpdateMangaInput } from './dto/update-manga.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { FilterMangaArgs } from './dto/filter-manga.args';
import { ChapterService } from 'src/chapter/chapter.service';

@Resolver(() => Manga)
export class MangaResolver {
  constructor(
    private readonly mangaService: MangaService,
    private readonly chapterService: ChapterService,
  ) {}

  @Mutation(() => Manga)
  async createManga(@Args('data') data: CreateMangaInput) {
    return this.mangaService.create(data);
  }

  @Query(() => [Manga], { name: 'mangaList' })
  findAll() {
    return this.mangaService.findAll();
  }

  @Query(() => [Manga], { name: 'mangaFiltredList' })
  filterManga(@Args() data: FilterMangaArgs) {
    return this.mangaService.filterManga(data);
  }

  @Query(() => Manga, { name: 'manga' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.mangaService.findOne(id);
  }

  @Mutation(() => Manga)
  updateManga(@Args('data') data: UpdateMangaInput) {
    return this.mangaService.update(data);
  }

  @Mutation(() => Manga)
  removeManga(@Args('id', { type: () => ID }) id: string) {
    return this.mangaService.remove(id);
  }

  @Mutation(() => Manga)
  @UseGuards(GqlAuthGuard)
  subscribe(
    @Args('mangaId', { type: () => ID }) mangaId: string,
    @CurrentUser() currentUser: User,
  ) {
    return this.mangaService.subscribe(currentUser.id, mangaId);
  }
}

import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { BookmarkService } from './bookmark.service';
import { Bookmark } from './entities/bookmark.entity';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Resolver(() => Bookmark)
export class BookmarkResolver {
  constructor(private readonly bookmarkService: BookmarkService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Bookmark)
  setBookmark(
    @Args('chapterId', { type: () => ID }) chapterId: string,
    @CurrentUser() currentUser: User,
  ) {
    return this.bookmarkService.set(currentUser.id, chapterId);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Bookmark], { name: 'bookmarks' })
  findAll(@CurrentUser() currentUser: User) {
    return this.bookmarkService.findAll(currentUser.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Bookmark, { name: 'bookmark' })
  findOne(
    @Args('mangaId', { type: () => ID }) mangaId: string,
    @CurrentUser() currentUser: User,
  ) {
    return this.bookmarkService.findOne(currentUser.id, mangaId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Bookmark)
  removeBookmark(
    @Args('bookmarkId', { type: () => ID }) bookmarkId: string,
    @CurrentUser() currentUser: User,
  ) {
    return this.bookmarkService.remove(currentUser.id, bookmarkId);
  }
}

/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { AnyPost, Collection, Images, News, Post, Review } from './entities/post.entity';
import {
  CreateImagesInput,
  CreateNewsInput,
  CreatePostInput,
  CreateReviewInput,
  CreateCollectionInput,
} from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { User } from 'src/user/entities/user.entity';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}
  createPost(currentUser, data, type) {
    data.authorId = currentUser.id
    if (data.mangaIds) {
      data.manga
    }
    console.log(1)
    return this.postService.create(type, data);
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => News)
  createNews(
  @Args('data', { nullable: true }) data: CreateNewsInput,
  @CurrentUser() currentUser: User
  ){
    return this.createPost(currentUser, data, 'news');
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Images)
  createImages(
  @Args('data', { nullable: true }) data: CreateImagesInput,
  @CurrentUser() currentUser: User
  ){
    return this.createPost(currentUser, data, 'images');
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Review)
  createReview(
  @Args('data', { nullable: true }) data: CreateReviewInput,
  @CurrentUser() currentUser: User
  ){
    return this.createPost(currentUser, data, 'review');
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Collection)
  createCollection(
  @Args('data', { nullable: true }) data: CreateCollectionInput,
  @CurrentUser() currentUser: User
  ){
    return this.createPost(currentUser, data, 'collection');
  }


  @Query(() => [AnyPost], { name: 'posts' })
  findAll(
    @Args('type', { nullable: true }) type: string,
  ) {
    return this.postService.findAll(type);
  }
}

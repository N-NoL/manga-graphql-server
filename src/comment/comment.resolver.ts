import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment, Vote } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Comment)
  createComment(
    @Args('data') createCommentInput: CreateCommentInput,
    @CurrentUser() currentUser: User,
  ) {
    return this.commentService.create(currentUser.id, createCommentInput);
  }

  @Query(() => [Comment], { name: 'comments' })
  findAll(
    @Args('opinionsId', { type: () => ID, nullable: true }) opinionsId: string,
  ) {
    return this.commentService.findAll(opinionsId);
  }

  @Query(() => [Comment], { name: 'comment' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.commentService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Comment)
  updateComment(
    @CurrentUser() currentUser: User,
    @Args('data') data: UpdateCommentInput,
  ) {
    return this.commentService.update(currentUser.id, data);
  }

  @Mutation(() => Comment)
  removeComment(
    @CurrentUser() currentUser: User,
    @Args('id', { type: () => ID }) id: string,
  ) {
    return this.commentService.remove(currentUser.id, id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Comment)
  toVote(
    @CurrentUser() currentUser: User,
    @Args('id', { type: () => ID }) id: string,
    @Args('vote') vote: Vote,
  ) {
    return this.commentService.toVote(currentUser.id, id, vote);
  }
}

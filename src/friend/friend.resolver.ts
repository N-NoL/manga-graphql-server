import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { FriendService } from './friend.service';
import { Friend, FriendStatus } from './entities/friend.entity';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Resolver(() => Friend)
export class FriendResolver {
  constructor(private readonly friendService: FriendService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Friend)
  createFriend(
    @Args('userId', { type: () => ID }) userId: string,
    @CurrentUser() currentUser: User,
  ) {
    return this.friendService.create(currentUser.id, userId);
  }

  @Query(() => [Friend], { name: 'friends' })
  findAll(
    @Args('friendStatus') friendStatus: FriendStatus,
    @Args('userId', { type: () => ID }) userId: string,
  ) {
    return this.friendService.findAll(userId, friendStatus);
  }

  @Query(() => Friend, { name: 'friend' })
  findOne(
    @Args('userId_1', { type: () => ID }) userId_1: string,
    @Args('userId_2', { type: () => ID }) userId_2: string,
  ) {
    return this.friendService.findOne(userId_1, userId_2);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Friend)
  removeFriend(
    @Args('userId', { type: () => ID }) userId: string,
    @CurrentUser() currentUser: User,
  ) {
    return this.friendService.remove(currentUser.id, userId);
  }
}

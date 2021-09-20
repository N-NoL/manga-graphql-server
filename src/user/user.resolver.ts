import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => User, { name: 'user' })
  findOneUser(
    @Args('id', { type: () => ID, nullable: true }) id: string,
    @Args('email', { type: () => String, nullable: true }) email: string,
  ) {
    return this.userService.findOne({ id, email });
  }
  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() currentUser: User) {
    return this.userService.findOne({ id: currentUser.id });
  }
  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  updateMyProfile(
    @CurrentUser() currentUser: User,
    @Args('updateUserData') updateUserData: UpdateUserInput,
  ) {
    return this.userService.update(currentUser.id, updateUserData);
  }
}

import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { RatingService } from './rating.service';
import { Rating } from './entities/rating.entity';
import { RatingInput } from './dto/rating.input';
import { User } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';

@Resolver(() => Rating)
export class RatingResolver {
  constructor(private readonly ratingService: RatingService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Rating)
  setRating(@CurrentUser() currentUser: User, @Args('data') data: RatingInput) {
    return this.ratingService.set(currentUser.id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Rating, { name: 'rating' })
  findOne(
    @CurrentUser() currentUser: User,
    @Args('opinionsId', { type: () => ID }) opinionsId: string,
  ) {
    return this.ratingService.findOne(currentUser.id, opinionsId);
  }
}

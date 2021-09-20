import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingResolver } from './rating.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { Opinions } from 'src/opinions/entities/opinions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, Opinions])],
  providers: [RatingResolver, RatingService],
})
export class RatingModule {}

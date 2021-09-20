import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Opinions } from 'src/opinions/entities/opinions.entity';
import { Repository } from 'typeorm';
import { RatingInput } from './dto/rating.input';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>,
    @InjectRepository(Opinions)
    private opinionsRepository: Repository<Opinions>,
  ) {}

  findOne(userId: string, opinionsId: string): Promise<Rating> {
    return this.ratingRepository.findOne({ opinionsId, userId });
  }

  async set(userId: string, data: RatingInput): Promise<Rating> {
    const opinions = await this.opinionsRepository.findOne(data.opinionsId);
    if (!opinions) {
      throw new Error('not found opinions');
    }
    data.value = Math.floor(+data.value / 0.5) * 0.5;
    if (data.value > 5 || data.value < 0) {
      throw new Error('invalid rating');
    }

    const rating = await this.ratingRepository.findOne({
      opinionsId: data.opinionsId,
      userId,
    });
    if (rating) {
      await this.ratingRepository.delete(rating.id);
      if (data.value === 0) {
        rating.opinions = await this.calculateStats(opinions);
        rating.value = 0;
        return rating;
      }
    }
    if (data.value) {
      const newRating = await this.ratingRepository.save({ ...data, userId });
      newRating.opinions = await this.calculateStats(opinions);
      return newRating;
    }
    throw new Error('server error');
  }

  async calculateStats(opinions: Opinions): Promise<Opinions> {
    const [{ ratingCount, ratingAverage }] = await this.ratingRepository
      .createQueryBuilder('rating')
      .where('rating.opinionsId = :opinionsId', { opinionsId: opinions.id })
      .select('COUNT(rating.value)', 'ratingCount')
      .addSelect('AVG(rating.value)', 'ratingAverage')
      .getRawMany();
    opinions.ratingCount = ratingCount;
    opinions.ratingAverage = ratingAverage || 0;
    return this.opinionsRepository.save(opinions);
  }
}

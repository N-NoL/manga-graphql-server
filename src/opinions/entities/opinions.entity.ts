import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';
import { Rating } from 'src/rating/entities/rating.entity';
import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Opinions {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @OneToMany(() => Comment, (comment) => comment.opinions)
  comments: Comment[];
  @OneToMany(() => Rating, (rating) => rating.opinions)
  ratings: Rating[];
  @Field(() => Float)
  @Column({ type: 'real', scale: 2, default: 0 })
  ratingAverage: number;
  @Field(() => Int)
  @Column({ default: 0 })
  ratingCount: number;
}

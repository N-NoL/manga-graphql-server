import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Opinions } from 'src/opinions/entities/opinions.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
@ObjectType()
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;
  @Column()
  @Field(() => ID)
  userId!: string;
  @Column()
  @Field(() => ID)
  opinionsId: string;
  @Field(() => Float)
  @Column({ type: 'real', scale: 1, default: 0 })
  value!: number;
  @Field(() => Opinions)
  @ManyToOne(() => Opinions, (opinions) => opinions.ratings, { eager: true })
  opinions!: Opinions;
  @ManyToOne(() => User, (user) => user.ratings)
  user!: User;
  @Field()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;
  @Field()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;
}

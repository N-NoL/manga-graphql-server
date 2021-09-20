import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Opinions } from 'src/opinions/entities/opinions.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Comment {
  @Column()
  @Field(() => ID)
  opinionsId: string;
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;
  @Column({ nullable: true })
  @Field(() => ID, { nullable: true })
  rootId: string;
  @Column({ nullable: true })
  @Field(() => ID, { nullable: true })
  parentId: string;
  @Column({ default: 0 })
  @Field(() => Int, { nullable: true })
  level: number;
  @ManyToOne(() => Opinions, (opinions) => opinions.comments)
  opinions: Opinions;
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comments, {
    cascade: true,
    eager: true,
    nullable: false,
  })
  user: User;
  @Column({ nullable: true })
  @Field(() => ID, { nullable: true })
  userId: string;
  @Column({ default: 0 })
  @Field(() => Int)
  votesUp: number;
  @Column({ default: 0 })
  @Field(() => Int)
  votesDown: number;
  @ManyToMany(() => User)
  @JoinTable()
  voteUpUsers: User[];
  @ManyToMany(() => User)
  @JoinTable()
  voteDownUsers: User[];
  @Column({ default: false })
  @Field()
  deleted: boolean;
  @Column({ nullable: false })
  @Field()
  text: string;
  @Field()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;
  @Field()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;
}

export enum Vote {
  UP = 'Up',
  DOWN = 'Down',
  FORGO = 'Forgo',
}

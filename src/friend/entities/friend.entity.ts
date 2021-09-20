import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum FriendStatus {
  STRANGER = 'Stranger',
  SUBSCRIBER = 'Subscriber',
  FRIEND = 'Friend',
}

@Entity()
@ObjectType()
export class Friend {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;
  @Field(() => ID)
  @Column()
  senderId: string;
  @Field(() => ID)
  @Column()
  receiverId: string;
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.friendRequests, {
    cascade: true,
    eager: true,
  })
  sender!: User;
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.friendResponses, {
    cascade: true,
    eager: true,
  })
  receiver!: User;
  @Field()
  @Column({ default: FriendStatus.STRANGER })
  status: FriendStatus;
  @Field()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;
  @Field()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;
}

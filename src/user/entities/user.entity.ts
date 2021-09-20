import { ObjectType, Field, ID, HideField } from '@nestjs/graphql';
import { Bookmark } from 'src/bookmark/entities/bookmark.entity';
import { Friend } from 'src/friend/entities/friend.entity';
import { Manga } from 'src/manga/entities/manga.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Rating } from 'src/rating/entities/rating.entity';
import { Post } from 'src/post/entities/post.entity';

export enum Status {
  ONLINE = 'online',
  OFFLINE = 'offline',
}
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;
  @Column({ unique: true })
  @Field()
  email: string;
  @Column({ unique: true })
  @Field()
  name: string;
  @Column()
  @HideField()
  password: string;
  @Column({ default: Status.OFFLINE })
  @Field({ defaultValue: Status.OFFLINE })
  status: Status;
  @Column({ default: Gender.OTHER })
  @Field({ defaultValue: Gender.OTHER })
  gender: Gender;
  @Column({
    default:
      'https://play-lh.googleusercontent.com/OswGqQjy3425Q_OYu9wULKybYm3F7Gb9yhgnO2ov8CZMXhKhgihGd584-Odu3bbRPWg=s180',
  })
  @Field({
    defaultValue:
      'https://play-lh.googleusercontent.com/OswGqQjy3425Q_OYu9wULKybYm3F7Gb9yhgnO2ov8CZMXhKhgihGd584-Odu3bbRPWg=s180',
  })
  avatar: string;
  @Column({
    default:
      'https://2.bp.blogspot.com/-YSRL7xmCD2Q/XQ8eHaJ9wkI/AAAAAAAAHtA/0-bVcL3HJmQ4eCCCJY8Sq9y0tGKoVw3IwCKgBGAs/w3840-h1600-p-k-no-nu/genshin-impact-uhdpaper.com-4K-1.jpg',
  })
  @Field({
    defaultValue:
      'https://2.bp.blogspot.com/-YSRL7xmCD2Q/XQ8eHaJ9wkI/AAAAAAAAHtA/0-bVcL3HJmQ4eCCCJY8Sq9y0tGKoVw3IwCKgBGAs/w3840-h1600-p-k-no-nu/genshin-impact-uhdpaper.com-4K-1.jpg',
  })
  cover: string;
  @Field(() => [Manga])
  @ManyToMany(() => Manga, (manga) => manga.subscribers)
  subscriptions: Manga[];
  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmarks: Bookmark[];
  @OneToMany(() => Friend, (friend) => friend.sender)
  friendRequests: Friend[];
  @OneToMany(() => Friend, (friend) => friend.receiver)
  friendResponses: Friend[];
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];
  @Field()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;
  @Field()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;
}

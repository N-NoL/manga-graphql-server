import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Chapter } from 'src/chapter/entities/chapter.entity';
import { Manga } from 'src/manga/entities/manga.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Bookmark {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;
  @Column()
  @Field(() => ID)
  chapterId!: string;
  @Column()
  @Field(() => ID)
  mangaId!: string;
  @Column()
  userId!: string;
  @ManyToOne(() => Manga, (manga) => manga.bookmarks, { cascade: true })
  manga!: Manga;
  @ManyToOne(() => Chapter, (chapter) => chapter.bookmarks, { cascade: true })
  chapter!: Chapter;
  @ManyToOne(() => User, (user) => user.bookmarks, { cascade: true })
  user!: User;
  @Field()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;
  @Field()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;
}

import { ObjectType, Field, Int, Float, ID } from '@nestjs/graphql';
import { Bookmark } from 'src/bookmark/entities/bookmark.entity';
import { Manga } from 'src/manga/entities/manga.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Chapter {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;
  @Field(() => Int)
  @Column({ type: 'int' })
  volume: number;
  @Field(() => Float)
  @Column({ type: 'real', scale: 1 })
  chapter: string;
  @Field()
  @Column()
  name?: string;
  @Field(() => [ChapterImage])
  @Column({ type: 'jsonb', select: true })
  images: ChapterImage[];
  @Field()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;
  @Field()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;
  @Field(() => ID)
  @Column()
  mangaId!: string;
  @ManyToOne(() => Manga, (manga) => manga.chapters)
  manga: Manga;
  @OneToMany(() => Bookmark, (bookmark) => bookmark.chapter)
  bookmarks: Bookmark[];
}

@ObjectType()
export class ChapterImage {
  @Field(() => Int)
  w: number;
  @Field(() => Int)
  h: number;
  @Field()
  url: string;
}

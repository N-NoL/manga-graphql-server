import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Bookmark } from 'src/bookmark/entities/bookmark.entity';
import { Chapter } from 'src/chapter/entities/chapter.entity';
import { Opinions } from 'src/opinions/entities/opinions.entity';
import {
  Format,
  Genre,
  Status,
  Tag,
  Type,
  Option,
  TranslateStatus,
} from 'src/options/entities/option.entity';
import { Review } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Manga {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;
  @Column({ nullable: false })
  @Field()
  russian_name: string;
  @Column({ nullable: false })
  @Field()
  english_name: string;
  @Column({ nullable: false })
  @Field()
  original_name: string;
  @Column('text', { array: true, default: [] })
  @Field(() => [String], { nullable: true })
  another_names: [string];
  @Column({ nullable: false })
  @Field(() => Int)
  releaseDate: number;
  @Column()
  @Field({ nullable: false })
  summary: string;
  @Field(() => [Option])
  @ManyToMany(() => Genre, { cascade: true, eager: true, nullable: false })
  @JoinTable()
  genres!: Genre[];
  @Field(() => [Option])
  @ManyToMany(() => Tag, { cascade: true, eager: true })
  @JoinTable()
  tags!: Tag[];
  @Field(() => [Option])
  @ManyToMany(() => Format, { cascade: true, eager: true, nullable: false })
  @JoinTable()
  formats: Format[];
  @Field(() => Option)
  @ManyToOne(() => Type, (type) => type.mangaList, {
    cascade: true,
    eager: true,
    nullable: false,
  })
  type!: Type;
  @Field(() => Option)
  @ManyToOne(() => Status, (status) => status.mangaList, {
    cascade: true,
    eager: true,
    nullable: false,
  })
  status!: Status;
  @Field(() => Option)
  @ManyToOne(
    () => TranslateStatus,
    (translateStatus) => translateStatus.mangaList,
    {
      cascade: true,
      eager: true,
      nullable: false,
    },
  )
  translateStatus!: TranslateStatus;
  @Field(() => [Review])
  @OneToMany(() => Review, (review) => review.manga)
  reviews: Review[];
  @ManyToMany(() => User, (user) => user.subscriptions, { cascade: true })
  @JoinTable()
  subscribers: User[];
  @Field(() => [Chapter])
  @OneToMany(() => Chapter, (chapter) => chapter.manga)
  chapters: Chapter[];
  @OneToMany(() => Bookmark, (bookmark) => bookmark.manga)
  bookmarks: Bookmark[];
  @Column({ default: 0 })
  @Field(() => Int)
  views: number;
  @Field(() => Opinions)
  @OneToOne(() => Opinions, { cascade: true, eager: true, nullable: false })
  @JoinColumn()
  opinions: Opinions;
  @Column({ nullable: false })
  opinionsId: string;
  @Column({ nullable: false })
  @Field()
  paper: string;
  @Column({ nullable: true })
  @Field({ nullable: true })
  oldLimit: string;
  @Column('text', { array: true, default: [] })
  @Field(() => [String])
  translators: string;
  @Column('text', { array: true, default: [] })
  @Field(() => [String])
  publishers: string;
  @Column('text', { array: true, default: [] })
  @Field(() => [String])
  illustrators: string;
  @Column('text', { array: true, default: [] })
  @Field(() => [String])
  screenwriters: string;
  @Column({ unique: false })
  @Field({ nullable: false })
  slug: string;
  @Field()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;
  @Field()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;
  @Field(() => Chapter, { nullable: true })
  @OneToOne(() => Chapter, { cascade: true, nullable: true })
  @JoinColumn()
  lastChapter: Chapter;
  @UpdateDateColumn({
    name: 'chapter_updated_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  chapterUpdatedAt: Date;
  @Field(() => Int)
  @Column({ default: 0 })
  chapterCount: number;
}

import { ObjectType, Field, Int, ID, PartialType } from '@nestjs/graphql';
import { Manga } from 'src/manga/entities/manga.entity';
import { Opinions } from 'src/opinions/entities/opinions.entity';
import { User } from 'src/user/entities/user.entity';
import {
  ChildEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;
  @Column({ default: 0 })
  @Field(() => Int)
  views: number;
  @Column()
  @Field()
  title: string;
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts, {
    cascade: true,
    eager: true,
    nullable: false,
  })
  author: User;
  @Field(() => ID)
  @Column({ nullable: false })
  authorId: string;
  @Field(() => Opinions)
  @OneToOne(() => Opinions, { cascade: true, eager: true, nullable: false })
  @JoinColumn()
  opinions: Opinions;
  @Field(() => ID)
  @Column({ nullable: false })
  opinionsId: string;
  @Field()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;
  @Field()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;
}

@ObjectType()
@ChildEntity()
export class News extends Post {
  @Column()
  @Field()
  image: string;
  @Column()
  @Field()
  text: string;
}

@ObjectType()
@ChildEntity()
export class Images extends Post {
  @Column({ type: 'text', array: true, default: [] })
  @Field(() => [String])
  images: string[];
}

@ObjectType()
@ChildEntity()
export class Review extends Post {
  @ManyToOne(() => Manga, (manga) => manga.reviews, {
    cascade: true,
    eager: true,
    nullable: false,
  })
  @Field(() => Manga)
  manga: Manga;
  @Field(() => ID)
  @Column()
  mangaId: string;
  @Column()
  @Field()
  text: string;
}

@ObjectType()
@ChildEntity()
export class Collection extends Post {
  @Column()
  @Field()
  image: string;
  @ManyToMany(() => Manga, { cascade: true, eager: true, nullable: false })
  @JoinTable()
  @Field(() => [Manga])
  mangaList: Manga[];
  @Column()
  @Field()
  text: string;
}

@ObjectType()
export class AnyPost extends Post {
  @Field({ nullable: true })
  image?: string;
  @Field({ nullable: true })
  text?: string;
  @Field(() => Manga, { nullable: true })
  manga?: Manga;
  @Field(() => ID, { nullable: true })
  mangaId?: string;
  @Field(() => [String], { nullable: true })
  images?: string[];
  @Field(() => [Manga], { nullable: true })
  mangaList?: Manga[];
}

import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { Collection, Images, News, Post, Review } from './entities/post.entity';
import { Manga } from 'src/manga/entities/manga.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpinionsModule } from 'src/opinions/opinions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Manga, News, Images, Review, Collection, Post]),
    OpinionsModule,
  ],
  providers: [PostResolver, PostService],
})
export class PostModule {}

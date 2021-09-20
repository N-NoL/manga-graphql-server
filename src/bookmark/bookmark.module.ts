import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkResolver } from './bookmark.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manga } from 'src/manga/entities/manga.entity';
import { Chapter } from 'src/chapter/entities/chapter.entity';
import { User } from 'src/user/entities/user.entity';
import { Bookmark } from './entities/bookmark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manga, Chapter, User, Bookmark])],
  providers: [BookmarkResolver, BookmarkService],
})
export class BookmarkModule {}

import { Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterResolver } from './chapter.resolver';
import { Manga } from 'src/manga/entities/manga.entity';
import { Chapter } from './entities/chapter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Manga, Chapter])],
  providers: [ChapterResolver, ChapterService],
  exports: [ChapterService],
})
export class ChapterModule {}

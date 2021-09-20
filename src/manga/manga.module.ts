import { Module } from '@nestjs/common';
import { MangaService } from './manga.service';
import { MangaResolver } from './manga.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manga } from './entities/manga.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Type,
  Status,
  Format,
  Genre,
  Tag,
  TranslateStatus,
} from 'src/options/entities/option.entity';
import { OpinionsModule } from 'src/opinions/opinions.module';
import { ChapterModule } from 'src/chapter/chapter.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Manga,
      Type,
      Status,
      Format,
      Genre,
      Tag,
      User,
      TranslateStatus,
    ]),
    ChapterModule,
    OpinionsModule,
  ],
  providers: [MangaResolver, MangaService],
})
export class MangaModule {}

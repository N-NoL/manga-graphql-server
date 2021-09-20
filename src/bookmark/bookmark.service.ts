import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chapter } from 'src/chapter/entities/chapter.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Bookmark } from './entities/bookmark.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Chapter)
    private chapterRepository: Repository<Chapter>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Bookmark)
    private bookmarkRepository: Repository<Bookmark>,
  ) {}
  async set(userId: string, chapterId: string): Promise<Bookmark> {
    const chapter = await this.chapterRepository.findOne(chapterId);
    if (!chapter) {
      throw new HttpException('chapter not found', HttpStatus.NOT_FOUND);
    }
    const crntBookmark = await this.bookmarkRepository.findOne({
      userId,
      mangaId: chapter.mangaId,
    });
    if (crntBookmark) {
      return await this.bookmarkRepository.save({ ...crntBookmark, chapterId });
    }
    return await this.bookmarkRepository.save({
      userId,
      chapterId,
      mangaId: chapter.mangaId,
    });
  }

  findAll(userId: string): Promise<Bookmark[]> {
    return this.bookmarkRepository.find({ userId });
  }

  findOne(userId: string, mangaId: string): Promise<Bookmark> {
    return this.bookmarkRepository.findOne({ userId, mangaId });
  }

  async remove(id: string, userId: string) {
    const crntBookmark = await this.bookmarkRepository.findOne({ id, userId });
    if (!crntBookmark) {
      throw new HttpException('Bookmark not found', HttpStatus.NOT_FOUND);
    }
    return await this.bookmarkRepository.remove(crntBookmark);
  }
}

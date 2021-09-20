import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manga } from 'src/manga/entities/manga.entity';
import { Repository } from 'typeorm';
import { CreateChapterInput } from './dto/create-chapter.input';
import { UpdateChapterInput } from './dto/update-chapter.input';
import { Chapter } from './entities/chapter.entity';

@Injectable()
export class ChapterService {
  constructor(
    @InjectRepository(Chapter)
    private chapterRepository: Repository<Chapter>,
    @InjectRepository(Manga)
    private mangaRepository: Repository<Manga>,
  ) {}
  async create(data: CreateChapterInput): Promise<Chapter> {
    const manga = await this.mangaRepository.findOne(data.mangaId);
    if (manga) {
      data.images = data.images.map((image) => {
        // validation
        const { w, h, url } = image;
        if (
          typeof w === 'number' &&
          typeof h === 'number' &&
          typeof url === 'string'
        ) {
          return { w, h, url };
        }
        throw new HttpException(
          `image format error`,
          HttpStatus.FAILED_DEPENDENCY,
        );
      });
      const chapter = await this.chapterRepository.save(data);
      await this.updateSubscriber(data.mangaId);
      return chapter;
    }
    throw new HttpException(`manga not found`, HttpStatus.FAILED_DEPENDENCY);
  }

  async findAll(mangaId: string): Promise<Chapter[]> {
    return await this.chapterRepository.find({
      where: { mangaId },
      order: { chapter: 'ASC', volume: 'ASC' },
    });
  }

  findOne(id: string): Promise<Chapter> {
    return this.chapterRepository.findOne(id);
  }

  async update(data: UpdateChapterInput): Promise<Chapter> {
    const chapter = await this.chapterRepository.findOne(data.id);
    if (!chapter) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }
    const newVersion: any = { ...chapter, ...data };
    return await this.chapterRepository.save(newVersion);
  }

  async remove(id: string): Promise<Chapter> {
    const chapter = await this.chapterRepository.findOne(id);
    if (!chapter) {
      throw new HttpException('chapter not found', HttpStatus.NOT_FOUND);
    }
    await this.chapterRepository.delete(id);
    await this.updateSubscriber(chapter.mangaId);
    return chapter;
  }

  async updateSubscriber(mangaId: string): Promise<Chapter> {
    const manga = await this.mangaRepository.findOne(mangaId);
    manga.lastChapter = (
      await this.chapterRepository.find({
        where: { mangaId },
        order: {
          volume: 'DESC',
          chapter: 'DESC',
        },
        take: 1,
      })
    )[0];
    manga.chapterUpdatedAt = (
      await this.chapterRepository.find({
        where: { mangaId },
        order: {
          createdAt: 'DESC',
        },
        take: 1,
      })
    )[0].createdAt;
    manga.chapterCount = await this.chapterRepository.count({
      where: { mangaId },
    });
    await this.mangaRepository.save(manga);
    return (
      await this.chapterRepository.find({
        where: { mangaId },
        order: {
          volume: 'DESC',
          chapter: 'DESC',
        },
        take: 1,
      })
    )[0];
  }
}

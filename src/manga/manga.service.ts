import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpinionsService } from 'src/opinions/opinions.service';
import {
  Format,
  Genre,
  Status,
  Tag,
  TranslateStatus,
  Type,
} from 'src/options/entities/option.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMangaInput } from './dto/create-manga.input';
import { SORT } from './dto/filter-manga.args';
import { UpdateMangaInput } from './dto/update-manga.input';
import { Manga } from './entities/manga.entity';

@Injectable()
export class MangaService {
  constructor(
    private opinionsService: OpinionsService,
    @InjectRepository(Manga)
    private mangaRepository: Repository<Manga>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
    @InjectRepository(TranslateStatus)
    private translateStatusRepository: Repository<TranslateStatus>,
    @InjectRepository(Type)
    private typeRepository: Repository<Type>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(Format)
    private formatRepository: Repository<Format>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async viewsCounter(manga: Manga): Promise<any> {
    manga.views++;
    return await this.mangaRepository
      .createQueryBuilder('manga')
      .update(Manga)
      .set({ views: manga.views })
      .where('id = :id', { id: manga.id })
      .execute();
  }
  async save(data: CreateMangaInput | UpdateMangaInput): Promise<Manga> {
    data.genres = await this.genreRepository.findByIds(data.genres);
    data.formats = await this.formatRepository.findByIds(data.formats);
    data.tags = await this.tagRepository.findByIds(data.tags);
    data.status = await this.statusRepository.findOne(data.status);
    data.translateStatus = await this.translateStatusRepository.findOne(
      data.translateStatus,
    );
    data.type = await this.typeRepository.findOne(data.type);
    return await this.mangaRepository.save(data);
  }

  async create(data: CreateMangaInput): Promise<Manga> {
    data.opinions = await this.opinionsService.create();
    return await this.save(data);
  }

  findAll() {
    return this.mangaRepository.find();
  }

  async filterMTM({ includeGenre = [], includeTag = [], includesAll }) {
    const list = await this.mangaRepository.createQueryBuilder();
    const selectList = ['Manga.id'];
    if (includeGenre.length) {
      selectList.push('Genre.id');
      list.innerJoinAndSelect(
        'Manga.genres',
        'Genre',
        'Genre.id IN (:...includeGenre)',
        { includeGenre },
      );
    }
    if (includeTag.length) {
      selectList.push('Tag.id');
      list.innerJoinAndSelect(
        'Manga.tags',
        'Tag',
        'Tag.id IN (:...includeTag)',
        // eslint-disable-next-line prettier/prettier
        { includeTag },
      );
    }

    let newList = await list
      .select(includesAll ? selectList : ['Manga.id'])
      .getMany();
    if (includesAll) {
      if (includeGenre.length) {
        // eslint-disable-next-line prettier/prettier
        newList = newList.filter((_) => _.genres.length === includeGenre.length);
      }
      if (includeTag.length) {
        newList = newList.filter((_) => _.tags.length === includeTag.length);
      }
    }
    return newList.map((_) => _.id);
  }

  async filterManga(data) {
    const query = this.mangaRepository.createQueryBuilder();
    if (data.excludeGenre || data.excludeTag) {
      if (data.excludeGenre.length + data.excludeTag.length > 0) {
        const ids = await this.filterMTM({
          includeGenre: data.excludeGenre,
          includeTag: data.excludeTag,
          includesAll: false,
        });
        if (ids.length) {
          query.where('Manga.id NOT IN (:...ids)', {
            ids,
          });
        }
      }
    }
    if (data.includeGenre || data.includeTag) {
      const ids = await this.filterMTM({
        includeGenre: data.includeGenre,
        includeTag: data.includeTag,
        includesAll: true,
      });
      if (ids.length === 0) return [];
      query.andWhereInIds(ids);
    }
    query
      .leftJoinAndSelect('Manga.genres', 'Genre')
      .leftJoinAndSelect('Manga.tags', 'Tag')
      .leftJoinAndSelect('Manga.status', 'Status')
      .leftJoinAndSelect('Manga.translateStatus', 'TranslateStatus')
      .leftJoinAndSelect('Manga.type', 'Type')
      .leftJoinAndSelect('Manga.formats', 'Format')
      .leftJoinAndSelect('Manga.opinions', 'Opinions');
    if (!data.lastUpdate)
      query.leftJoinAndSelect('Manga.lastChapter', 'Chapter');
    if (data.lastUpdate) {
      query
        .innerJoinAndSelect('Manga.chapters', 'Chapter')
        .orderBy('Chapter.createdAt', 'DESC');
    }
    if (data.status && data.status.length)
      query.andWhere('Status.id IN (:...status)', data);
    if (data.translateStatus && data.translateStatus.length)
      query.andWhere('TranslateStatus.id IN (:...translateStatus)', data);
    if (data.type && data.type.length)
      query.andWhere('Type.id IN (:...type)', data);
    if (data.formats && data.formats.length)
      query.andWhere('Format.id IN (:...formats)', data);

    query.orderBy(SORT[data.sort], data.dir);
    if (data.name)
      query.andWhere(
        `Manga.russian_name like '%' || :q || '%'  or  Manga.english_name like '%' || :q || '%'  or  Manga.original_name like '%' || :q || '%'`,
        { q: data.name },
      );

    query.skip(data.skip).take(data.take);
    return query.getMany();
  }

  async findOne(id: string): Promise<Manga> {
    const manga = await this.mangaRepository.findOne(id);
    this.viewsCounter(manga);
    return manga;
  }

  async update(data: UpdateMangaInput): Promise<Manga> {
    const manga = await this.mangaRepository.findOne(data.id);
    if (!manga) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }
    return await this.save({ ...manga, ...data });
  }

  async remove(id: string): Promise<Manga> {
    const manga = await this.mangaRepository.findOne(id);
    if (manga) {
      await this.mangaRepository.delete(id);
      return manga;
    }
    throw new HttpException('not found', HttpStatus.NOT_FOUND);
  }

  async subscribe(userId: string, mangaId: string): Promise<Manga> {
    const manga = await this.mangaRepository.findOne(mangaId);
    if (!manga) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }
    await this.userRepository
      .createQueryBuilder()
      .relation(User, 'subscriptions')
      .of(userId)
      .add(mangaId);
    await this.opinionsService.remove(manga.opinionsId);
    return manga;
  }
}

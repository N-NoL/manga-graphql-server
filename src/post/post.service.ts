import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manga } from 'src/manga/entities/manga.entity';
import { OpinionsService } from 'src/opinions/opinions.service';
import { Repository } from 'typeorm';
import { CreateAnyPostType } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Collection, Images, News, Post, Review } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    private opinionsService: OpinionsService,
    @InjectRepository(Manga)
    private mangaRepository: Repository<Manga>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Images)
    private imagesRepository: Repository<Images>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(News)
    private newsRepository: Repository<News>,
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
  ) {}
  postTypeChecker(type: string) {
    if (!['news', 'images', 'review', 'collection', 'post'].includes(type))
      throw new Error('invalid post type');
  }
  async create(type: string, data: CreateAnyPostType) {
    this.postTypeChecker(type);
    data.opinions = await this.opinionsService.create();
    if (type === 'collection') {
      data.mangaList = await this.mangaRepository.findByIds(data.mangaIds);
      if (data.mangaList.length === 0) throw new Error('manga count != 0 !!!');
    }
    if (type === 'images') {
      if (data.images.length === 0) throw new Error('images count != 0 !!!');
    }
    return this[`${type}Repository`].save(data);
  }

  async findAll(type: string) {
    this.postTypeChecker(type);
    return await this[`${type}Repository`].find();
  }
}

import { Field, ID, Int, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class FilterMangaArgs {
  @Field(() => [ID], { nullable: true })
  includeTag?: string[];
  @Field(() => [ID], { nullable: true })
  excludeTag?: string[];
  @Field(() => [ID], { nullable: true })
  includeGenre?: string[];
  @Field(() => [ID], { nullable: true })
  excludeGenre?: string[];
  @Field(() => [ID], { nullable: true })
  type?: string[];
  @Field(() => [ID], { nullable: true })
  formats?: string[];
  @Field(() => [ID], { nullable: true })
  status?: string[];
  @Field(() => [ID], { nullable: true })
  translateStatus?: string[];
  @Field(() => Int)
  take: number;
  @Field(() => Int)
  skip: number;
  @Field()
  sort: string;
  @Field()
  dir: string;
  @Field()
  name: string;
  @Field({ defaultValue: false })
  lastUpdate: boolean;
}

export enum SORT {
  NAME = 'Manga.russian_name',
  VIEWS = 'Manga.views',
  RATING = 'Opinions.ratingAverage',
  CREATED_AT = 'Manga.createdAt',
  UPDATED_AT = 'Manga.chapterUpdatedAt',
  CHAPTER_CNT = 'Manga.chapterCount',
}

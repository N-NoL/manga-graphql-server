import { InputType, Int, Field, Float, ID } from '@nestjs/graphql';
import JSON from 'graphql-type-json';
import { ChapterImage } from '../entities/chapter.entity';

@InputType()
export class CreateChapterInput {
  @Field(() => Int)
  volume: number;
  @Field(() => Float)
  chapter: string;
  @Field()
  name?: string;
  @Field(() => [JSON])
  images: ChapterImage[];
  @Field(() => ID)
  mangaId!: string;
}

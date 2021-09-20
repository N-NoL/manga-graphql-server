import { InputType, Field, ID } from '@nestjs/graphql';
import { Manga } from 'src/manga/entities/manga.entity';
import { Opinions } from 'src/opinions/entities/opinions.entity';

@InputType()
export class CreatePostInput {
  @Field()
  title: string;
  opinions: Opinions;
  authorId: string;
  mangaId?: string;
  mangaIds?: string[];
  images?: string[];
  manga?: Manga[];
  mangaList?: Manga[];
}

@InputType()
export class CreateNewsInput extends CreatePostInput {
  @Field()
  image: string;
  @Field()
  text: string;
}

@InputType()
export class CreateImagesInput extends CreatePostInput {
  @Field(() => [String])
  images: [string];
}

@InputType()
export class CreateReviewInput extends CreatePostInput {
  @Field(() => ID)
  mangaId: string;
  @Field()
  text: string;
}

@InputType()
export class CreateCollectionInput extends CreatePostInput {
  @Field()
  image: string;
  @Field(() => [ID])
  mangaIds: [string];
  @Field()
  text: string;
}

export type CreateAnyPostType =
  | CreateNewsInput
  | CreateImagesInput
  | CreateReviewInput
  | CreateCollectionInput;

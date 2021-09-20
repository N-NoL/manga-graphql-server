import {
  CreateImagesInput,
  CreateNewsInput,
  CreatePostInput,
  CreateReviewInput,
  CreateCollectionInput,
} from './create-post.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field(() => ID)
  id: string;
}

@InputType()
export class UpdateNewsInput extends PartialType(CreateNewsInput) {
  @Field(() => ID)
  id: string;
}

@InputType()
export class UpdateImagesInput extends PartialType(CreateImagesInput) {
  @Field(() => ID)
  id: string;
}

@InputType()
export class UpdateReviewInput extends PartialType(CreateReviewInput) {
  @Field(() => ID)
  id: string;
}

@InputType()
export class UpdateCollectionInput extends PartialType(CreateCollectionInput) {
  @Field(() => ID)
  id: string;
}

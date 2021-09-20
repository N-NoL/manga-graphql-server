import { CreateMangaInput } from './create-manga.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMangaInput extends PartialType(CreateMangaInput) {
  @Field(() => ID)
  id: string;
}

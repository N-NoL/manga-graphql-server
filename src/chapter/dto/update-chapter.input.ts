import { CreateChapterInput } from './create-chapter.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChapterInput extends PartialType(CreateChapterInput) {
  @Field(() => ID)
  id: string;
}

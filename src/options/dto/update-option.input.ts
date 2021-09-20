import { CreateOptionInput } from './create-option.input';
import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateOptionInput extends CreateOptionInput {
  @Field(() => ID)
  id: string;
}

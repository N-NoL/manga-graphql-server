import { InputType, Field } from '@nestjs/graphql';
import { OptionType } from '../entities/option.entity';

@InputType()
export class CreateOptionInput {
  @Field()
  option_name: string;
  @Field()
  option_type: OptionType;
}

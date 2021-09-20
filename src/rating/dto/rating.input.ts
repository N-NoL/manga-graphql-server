import { InputType, Field, ID, Float } from '@nestjs/graphql';

@InputType()
export class RatingInput {
  @Field(() => ID)
  opinionsId: string;
  @Field(() => Float)
  value!: number;
}

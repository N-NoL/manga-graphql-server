import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => ID, { nullable: true })
  opinionsId: string;
  @Field(() => ID, { nullable: true })
  parentId: string;
  @Field()
  text: string;
}

import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { Opinions } from 'src/opinions/entities/opinions.entity';
import {
  Format,
  Genre,
  Tag,
  Type,
  Status,
  TranslateStatus,
} from 'src/options/entities/option.entity';

@InputType()
export class CreateMangaInput {
  @Field()
  russian_name: string;
  @Field()
  english_name: string;
  @Field()
  original_name: string;
  @Field(() => [String])
  another_names: [string];
  @Field(() => Int)
  releaseDate: number;
  @Field()
  summary: string;
  @Field(() => [ID])
  genres!: Genre[];
  @Field(() => [ID])
  tags!: Tag[];
  @Field(() => [ID])
  formats: Format[];
  @Field(() => ID)
  type!: Type;
  @Field()
  paper: string;
  @Field(() => ID)
  status!: Status;
  @Field(() => ID)
  translateStatus!: TranslateStatus;
  @Field({ nullable: true })
  oldLimit: string;
  @Field(() => [String])
  translators: string;
  @Field(() => [String])
  publishers: string;
  @Field(() => [String])
  illustrators: string;
  @Field(() => [String])
  screenwriters: string;
  @Field()
  slug: string;
  opinions: Opinions;
}

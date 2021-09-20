import { InputType, Field } from '@nestjs/graphql';
import { Gender } from '../entities/user.entity';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;
  @Field()
  name: string;
  @Field()
  password: string;
  @Field({ defaultValue: Gender.OTHER })
  gender: Gender;
  @Field({
    defaultValue:
      'https://play-lh.googleusercontent.com/OswGqQjy3425Q_OYu9wULKybYm3F7Gb9yhgnO2ov8CZMXhKhgihGd584-Odu3bbRPWg=s180',
  })
  avatar: string;
  @Field({
    defaultValue:
      'https://2.bp.blogspot.com/-YSRL7xmCD2Q/XQ8eHaJ9wkI/AAAAAAAAHtA/0-bVcL3HJmQ4eCCCJY8Sq9y0tGKoVw3IwCKgBGAs/w3840-h1600-p-k-no-nu/genshin-impact-uhdpaper.com-4K-1.jpg',
  })
  cover: string;
}

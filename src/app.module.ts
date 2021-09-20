import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import config from 'ormconfig';
import { AuthModule } from './auth/auth.module';
import { MangaModule } from './manga/manga.module';
import { OptionsModule } from './options/options.module';
import { ChapterModule } from './chapter/chapter.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { FriendModule } from './friend/friend.module';
import { OpinionsModule } from './opinions/opinions.module';
import { CommentModule } from './comment/comment.module';
import { RatingModule } from './rating/rating.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(config()),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      cors: {
        credentials: true,
        origin: true,
      },
    }),
    UserModule,
    AuthModule,
    MangaModule,
    OptionsModule,
    ChapterModule,
    BookmarkModule,
    FriendModule,
    OpinionsModule,
    CommentModule,
    RatingModule,
    PostModule,
  ],
})
export class AppModule {}

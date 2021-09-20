import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { Comment } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Comment, User])],
  providers: [CommentResolver, CommentService],
})
export class CommentModule {}

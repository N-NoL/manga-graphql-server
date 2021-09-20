import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { createQueryBuilder, getConnection, Repository } from 'typeorm';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment, Vote } from './entities/comment.entity';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(userId: string, data: CreateCommentInput): Promise<Comment> {
    const user = await this.userRepository.findOne(userId);
    let comment: Comment | PromiseLike<Comment>;
    if (data.parentId) {
      const { rootId, opinionsId, level } =
        await this.commentRepository.findOne(data.parentId);
      comment = await this.commentRepository.save({
        ...data,
        userId,
        rootId: level === 0 ? data.parentId : rootId,
        opinionsId,
        level: level + 1,
      });
    } else {
      comment = await this.commentRepository.save({
        ...data,
        userId,
      });
    }
    comment.user = user;
    return comment;
  }

  findAll(opinionsId): Promise<Comment[]> {
    return this.commentRepository.find({ opinionsId });
  }

  findOne(id: string): Promise<Comment> {
    return this.commentRepository.findOne(id);
  }

  update(userId: string, data: UpdateCommentInput): Promise<Comment> {
    const comment = this.commentRepository.findOne({ id: data.id, userId });
    if (comment) {
      return this.commentRepository.save({ ...comment, ...data });
    }
    throw new HttpException('not found', HttpStatus.NOT_FOUND);
  }

  remove(userId: string, id: string): Promise<Comment> {
    const comment = this.commentRepository.findOne({ id, userId });
    if (comment) {
      return this.commentRepository.save({ ...comment, deleted: true });
    }
    throw new HttpException('not found', HttpStatus.NOT_FOUND);
  }

  async toVote(userId: string, id: string, vote: Vote): Promise<Comment> {
    const comment = await this.findOne(id);
    if (![Vote.UP, Vote.DOWN, Vote.FORGO].includes(vote)) {
      throw new HttpException('vote not found', HttpStatus.BAD_REQUEST);
    }
    const voteUp = await createQueryBuilder('Comment')
      .innerJoinAndSelect('Comment.voteUpUsers', 'user', 'user.id = :userId', {
        userId,
      })
      .where('Comment.id = :id', { id })
      .getOne();
    const voteDown = await createQueryBuilder('Comment')
      .innerJoinAndSelect(
        'Comment.voteDownUsers',
        'user',
        'user.id = :userId',
        {
          userId,
        },
      )
      .where('Comment.id = :id', { id })
      .getOne();
    if (voteUp || voteDown) {
      await getConnection()
        .createQueryBuilder()
        .relation(Comment, voteUp ? 'voteUpUsers' : 'voteDownUsers')
        .of(id)
        .remove(userId);
      if (voteUp) {
        comment.votesUp--;
      }
      if (voteDown) {
        comment.votesDown--;
      }
      await this.commentRepository.save(comment);
    }

    if (vote !== Vote.FORGO) {
      await getConnection()
        .createQueryBuilder()
        .relation(Comment, vote === Vote.UP ? 'voteUpUsers' : 'voteDownUsers')
        .of(id)
        .add(userId);
      if (vote === Vote.UP) {
        comment.votesUp++;
      }
      if (vote === Vote.DOWN) {
        comment.votesDown++;
      }
      await this.commentRepository.save(comment);
    }
    return comment;
  }
}

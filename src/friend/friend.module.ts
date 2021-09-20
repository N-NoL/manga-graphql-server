import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendResolver } from './friend.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from './entities/friend.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Friend, User])],
  providers: [FriendResolver, FriendService],
})
export class FriendModule {}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Friend, FriendStatus } from './entities/friend.entity';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friend)
    private friendRepository: Repository<Friend>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(currentUserId: string, userId: string): Promise<Friend> {
    const user = await this.userRepository.findOne(currentUserId);
    if (currentUserId === userId) {
      throw new HttpException('BAD REQUEST', HttpStatus.BAD_REQUEST);
    }
    const params = { senderId: currentUserId, receiverId: userId };
    const [friends, count] = await this.friendRepository
      .createQueryBuilder('friend')
      .where(
        'friend.senderId = :senderId AND friend.receiverId = :receiverId',
        params,
      )
      .orWhere(
        'friend.senderId = :receiverId AND friend.receiverId = :senderId',
        params,
      )
      .leftJoinAndSelect('friend.receiver', 'user')
      .getManyAndCount();
    if (count === 0) {
      return await this.friendRepository.save({
        ...params,
        status: FriendStatus.SUBSCRIBER,
        sender: user,
      });
    }
    if (count === 1 && friends[0].senderId !== params.senderId) {
      await this.friendRepository.save({
        ...friends[0],
        status: FriendStatus.FRIEND,
        receiver: user,
      });
      return await this.friendRepository.save({
        ...params,
        status: FriendStatus.FRIEND,
        sender: user,
      });
    }
    throw new HttpException('Accepted', HttpStatus.ACCEPTED);
  }

  async findOne(userId_1: string, userId_2: string): Promise<Friend> {
    const friend = await this.friendRepository
      .createQueryBuilder('friend')
      .where('friend.senderId = :userId_1', { userId_1 })
      .andWhere('friend.receiverId = :userId_2', { userId_2 })
      .orWhere('friend.senderId = :userId_2', { userId_2 })
      .andWhere('friend.receiverId = :userId_1', { userId_1 })
      .getOne();
    friend.sender = await this.userRepository.findOne(friend.senderId);
    friend.receiver = await this.userRepository.findOne(friend.receiverId);
    return friend;
  }

  async findAll(id: string, friendStatus: FriendStatus): Promise<Friend[]> {
    const user = await this.userRepository.findOne(id);
    return (
      await this.friendRepository
        .createQueryBuilder('friend')
        .where(
          friendStatus === FriendStatus.STRANGER
            ? 'friend.receiverId = :id'
            : 'friend.senderId = :id',
          { id },
        )
        .andWhere('friend.status = :friendStatus', {
          friendStatus:
            friendStatus === FriendStatus.STRANGER
              ? FriendStatus.SUBSCRIBER
              : friendStatus,
        })
        .leftJoinAndSelect(
          friendStatus !== FriendStatus.STRANGER
            ? 'friend.receiver'
            : 'friend.sender',
          'user',
        )
        .getMany()
    ).map((el) => {
      if (friendStatus === FriendStatus.STRANGER) {
        return { ...el, receiver: user };
      }
      return { ...el, sender: user };
    });
  }

  async remove(currentUserId: string, userId: string): Promise<Friend> {
    const requestParams = { senderId: currentUserId, receiverId: userId };
    const requestFriend = await this.friendRepository.findOne(requestParams);
    const responseParams = { senderId: userId, receiverId: currentUserId };
    const responseFriend = await this.friendRepository.findOne(responseParams);
    if (!(requestFriend || responseFriend)) {
      throw new HttpException('Accepted', HttpStatus.ACCEPTED);
    }
    // console.log(requestFriend.sender.name,responseFriend.sender.name);
    // this.create(responseFriend.sender.id, requestFriend.sender.id);
    if (responseFriend) {
      await this.friendRepository.delete(responseFriend.id);
      responseFriend.status = FriendStatus.STRANGER;
    }
    if (requestFriend) {
      await this.friendRepository.delete(requestFriend.id);
      requestFriend.status = FriendStatus.STRANGER;
      if (responseFriend) {
        return this.create(responseFriend.sender.id, requestFriend.sender.id);
      }
      return requestFriend;
    }
    if (responseFriend) {
      return responseFriend;
    }
    throw new HttpException('BAD REQUEST', HttpStatus.BAD_REQUEST);
  }
}

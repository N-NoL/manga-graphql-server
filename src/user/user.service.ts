import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { pickBy, identity } from 'lodash';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(data: { id?: string; email?: string }): Promise<User> {
    return this.userRepository.findOne(pickBy(data, identity));
  }

  async create(data: CreateUserInput): Promise<User> {
    data.password = await bcrypt.hash(data.password, 10);
    return this.userRepository.save(data);
  }

  async update(id, data: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (user) return this.userRepository.save({ ...user, ...data });
    throw new Error('user with this id does not exist');
  }
}

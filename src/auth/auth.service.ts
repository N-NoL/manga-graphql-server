import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthInput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async registration(data: CreateUserInput): Promise<AuthType> {
    const user = await this.userService.create(data);
    return {
      user,
      token: await this.jwtToken(user),
    };
  }

  async validateUser(data: AuthInput): Promise<AuthType> {
    const user = await this.userService.findOne({ email: data.email });

    const validPasssword = await bcrypt.compare(data.password, user.password);

    if (!validPasssword) throw new UnauthorizedException('Incorrect password');

    return {
      user,
      token: await this.jwtToken(user),
    };
  }

  private async jwtToken(user: User): Promise<string> {
    const payload = { email: user.email, id: user.id };
    return this.jwtService.signAsync(payload);
  }
}

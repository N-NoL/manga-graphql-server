import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  // eslint-disable-next-line prettier/prettier
  async validate(payload: { email: User['email'], id: User['id'] }) {
    const user = this.userService.findOne({ id: payload.id });

    if (!user) throw new UnauthorizedException('Unauthorized');

    return user;
  }
}

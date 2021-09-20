import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { AnonymousStrategy } from './anonymous.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'secret',
        signOptions: {
          expiresIn: '7d',
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    UserService,
    JwtStrategy,
    AnonymousStrategy,
  ],
})
export class AuthModule {}

import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthType)
  async login(@Args('data') data: AuthInput): Promise<AuthType> {
    return await this.authService.validateUser(data);
  }
  @Mutation(() => AuthType)
  registration(@Args('data') data: CreateUserInput): Promise<AuthType> {
    return this.authService.registration(data);
  }
}

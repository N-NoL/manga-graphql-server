import { Injectable } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';

@Injectable()
export class OptionalGqlAuthGuard extends GqlAuthGuard {
  handleRequest(err, user, info) {
    // no error is thrown if no user is found
    return user;
  }
}

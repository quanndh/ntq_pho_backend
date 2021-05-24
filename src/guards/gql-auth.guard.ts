import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { GraphQLContext } from 'src/graphql/app.graphql-context';
@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx: GraphQLContext = GqlExecutionContext.create(context).getContext();
    return ctx.req;
  }
}

@Injectable()
export class GqlCookieAuthGuard extends AuthGuard('cookie') {
  getRequest(context: ExecutionContext) {
    const ctx: GraphQLContext = GqlExecutionContext.create(context).getContext();
    return ctx.req;
  }
}

@Injectable()
export class GqlCookieAuthCheckGuard extends AuthGuard('cookie') {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext<GraphQLContext>();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const accessToken = ctx.req.cookies.token;
    if (!accessToken) return true;
    return super.canActivate(context);
  }
  getRequest(context: ExecutionContext) {
    const ctx: GraphQLContext = GqlExecutionContext.create(context).getContext();
    return ctx.req;
  }
}

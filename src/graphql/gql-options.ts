import { Request, Response } from 'express';
import { GqlModuleOptions } from '@nestjs/graphql';
import { ApolloComplexityPlugin } from './plugins/ApolloComplexityPlugin';

export const gqlOptions: GqlModuleOptions = {
  fieldResolverEnhancers: ['guards', 'filters', 'interceptors'],
  path: '/graphql',
  uploads: {
    maxFieldSize: 100 * 1000000, // 100MB
    maxFileSize: 50 * 1000000, // 50 MB
    maxFiles: 20,
  },
  playground: true,
  debug: true,
  installSubscriptionHandlers: true,
  autoSchemaFile: true,
  tracing: false,
  plugins: [new ApolloComplexityPlugin(150)],
  context: ({ req, res, connection }: { req: Request; res: Response; connection: any }) => {
    if (connection) {
      // check connection for metadata
      return { req: connection.context as Request, res };
    } else {
      // check from req
      // return new GraphQLContext(req, res);
      return { req, res };
    }
  },
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  // formatError: (err) => {
  //   if (err?.message == 'Validation failed') {
  //     const e = err?.extensions;
  //     delete e?.exception;
  //     return { message: err?.message, extensions: e, statusCode: 400 };
  //   }
  //   // return err;
  //   const error = getErrorCode(err?.message);
  //   return { message: error?.message || err.message, statusCode: error?.statusCode || 500 };
  // },
};

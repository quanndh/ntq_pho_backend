import './dotenv-config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import compression from 'compression';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { UserInputError } from 'apollo-server';
import { json } from 'body-parser';

const PORT = parseInt(process.env.PORT ?? '3000', 10);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: process.env.NODE_ENV === 'production' ? false : ['error', 'debug', 'warn'],
    bodyParser: true,
  });

  app.use(cookieParser());
  app.useStaticAssets('uploads', {
    prefix: '/uploads',
    immutable: true,
  });
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: true,
      validateCustomDecorators: false,
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => {
        console.log(errors);
        const errData: Record<string, any> = {};
        errors.map((v) => {
          errData[v.property] = v.constraints;
        });
        throw new UserInputError('Validation failed', errData);
      },
    }),
  );
  app.use(json({ limit: '10mb' })); //The default limit defined by body-parser is 100kb
  app.use(helmet());
  app.use(compression());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(PORT);
  console.info(`Application is running on: ${await app.getUrl()}`);
}
bootstrap().finally(() => {
  //
});

process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code: ', code);
});

process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
});

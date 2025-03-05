import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { ExceptionsFilter } from './filters/exceptions/exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger(bootstrap.name);

  const config = new DocumentBuilder()
    .setTitle('Ziweton Service')
    .setVersion('1.0')
    // .addBearerAuth(
    //   {
    //     type: 'http',
    //     scheme: 'bearer',
    //     bearerFormat: 'JWT',
    //     name: 'JWT',
    //     description: 'Enter JWT token',
    //     in: 'header',
    //   },
    //   'JWT-auth',
    // )
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.enableCors({ origin: '*' });
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new ExceptionsFilter());

  await app.listen(3600, () => {
    logger.debug('Server is running at http://localhost:3600');
  });
}
bootstrap();

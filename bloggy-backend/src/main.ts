/* #region  Global Imports */
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
/* #endregion */
import { Environments, EnvironmentVariables } from '@domain/enum';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { GlobalExceptionFilter } from '@infrastructure/middleware/GlobalExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* #region  Global Exception Middleware */
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapter));
  /* #endregion */
  app.use(helmet());
  /* #region  Swagger Module */
  if (process.env.NODE_ENV === Environments.development) {
    const config = new DocumentBuilder()
      .setTitle('Bloggy Doc')
      .setDescription('Bloggy api description')
      .setVersion('1.0')
      .addSecurity('jwt', {
        description: `Please enter token in following format: Bearer -JWT-`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header'
      })
      // .addTag('cats')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
    SwaggerModule.setup('/', app, document);
  }
  /* #endregion */

  await app.listen(process.env[EnvironmentVariables.APP_PORT] || 5000);
}
bootstrap();

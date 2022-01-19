/* #region  Global Imports */
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
/* #endregion */
import { Environments } from '@domain/enum';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* #region  Swagger Module */
  if (process.env.NODE_ENV === Environments.development) {
    const config = new DocumentBuilder()
      .setTitle('Bloggy Doc')
      .setDescription('Sample blog api description')
      .setVersion('1.0')
      // .addTag('cats')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
    SwaggerModule.setup('/', app, document);
  }
  /* #endregion */

  await app.listen(3000);
}
bootstrap();

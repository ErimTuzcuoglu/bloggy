/* #region  Global Imports */
import { ViewService } from '@application/services';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ServeStaticModule } from '@nestjs/serve-static';
import { BlogController } from '@presentation/controllers/blog.controller';
import { join } from 'path';
import { AuthModule } from '..';
/* #endregion */

@Module({
  controllers: [BlogController],
  providers: [ViewService],
  imports: [
    CqrsModule,
    AuthModule,
    ServeStaticModule.forRoot({
      serveRoot: 'newblog',
      rootPath: join(__dirname, '../../../../..', 'bloggy-ui', 'pages')
    })
  ]
})
export class SSRModule {}

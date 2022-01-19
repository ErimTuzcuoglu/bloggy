import { ConfigModule } from '@nestjs/config';
import { setEnvironment } from '@infrastructure/environments/helper';
import dbConfiguration from '@persistence/database/db.config';

ConfigModule.forRoot({
  isGlobal: true,
  expandVariables: true,
  envFilePath: setEnvironment(),
  load: [dbConfiguration]
});

export default dbConfiguration();

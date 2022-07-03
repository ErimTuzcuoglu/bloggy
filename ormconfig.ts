import EnvironmentConfig from '@infrastructure/environments/EnvironmentConfig';
import dbConfiguration from '@persistence/database/db.config';

EnvironmentConfig.Configure();

export default dbConfiguration();

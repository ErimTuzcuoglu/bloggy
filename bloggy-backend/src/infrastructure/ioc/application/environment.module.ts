/* #region  Global Imports */
import { Module } from '@nestjs/common';
/* #endregion */
import EnvironmentConfig from '@infrastructure/environments/EnvironmentConfig';

@Module({
  imports: [EnvironmentConfig.Configure()]
})
export class EnvironmentModule {}

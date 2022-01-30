import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from '@domain/schemas';
import DatabaseSetupForStartup from '@persistence/database/DatabaseSetupForStartup';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema]),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        await DatabaseSetupForStartup(configService);
        return { ...(await configService.get('database')) };
      }
    })
  ]
})
export class DatabaseModule {}

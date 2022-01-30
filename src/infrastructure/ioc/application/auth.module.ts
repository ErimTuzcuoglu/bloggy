import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from '@application/services';
import { UserSchema } from '@domain/schemas';
import { JWTStrategy } from '@infrastructure/security/strategy/JWTStrategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, JWTStrategy],
  exports: [AuthService]
})
export class AuthModule {}

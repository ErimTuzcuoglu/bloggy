import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { EnvironmentVariables } from '@domain/enum';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env[EnvironmentVariables.JWT_ACCESS_TOKEN_SECRET]
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}

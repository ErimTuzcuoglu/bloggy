import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { JwtPayload } from 'jsonwebtoken';
import { UserSchema } from '@domain/schemas';
import { ErrorMessages } from '@domain/enum';
import { AuthorizeException } from '@domain/exceptions';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserSchema) private userRepository: Repository<UserSchema>,
    private jwtService: JwtService
  ) {}

  async validateUser(token: string): Promise<boolean> {
    if (token === undefined) throw new AuthorizeException(ErrorMessages.YouMustAutheticateFirst);

    try {
      const tokenVerify: JwtPayload | string = this.verifyToken(token?.replace('Bearer ', ''));

      if (tokenVerify !== undefined && (tokenVerify as JwtPayload).id) {
        const user = await this.userRepository.findOne((tokenVerify as JwtPayload).id);
        if (user !== undefined) return true;
        else throw new Error(ErrorMessages.UserCouldNotFound);
      }
    } catch (error) {
      let errorMessage = error.message;
      if (error.name === 'JsonWebTokenError') {
        errorMessage = ErrorMessages.InvalidToken;
      } else if (error.name === 'TokenExpiredError') {
        errorMessage = ErrorMessages.TokenExpired;
      }

      throw new AuthorizeException(errorMessage);
    }

    return false;
  }

  async generateToken(
    payload: string | Record<string, unknown> | Buffer,
    options?: JwtSignOptions
  ): Promise<string> {
    return this.jwtService.sign(payload, options);
  }

  verifyToken(token: string, options?: JwtVerifyOptions): Record<string, unknown> {
    return this.jwtService.verify(token, options);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { JwtPayload } from 'jsonwebtoken';
import { UserSchema } from '@domain/schemas';
import { ErrorMessages } from '@domain/enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserSchema) private userRepository: Repository<UserSchema>,
    private jwtService: JwtService
  ) {}

  async validateUser(token: string): Promise<boolean> {
    const tokenVerify: JwtPayload | string = this.verifyToken(token);

    if (tokenVerify !== undefined && (tokenVerify as JwtPayload).id) {
      const user = this.userRepository.findOne((tokenVerify as JwtPayload).id);
      if (user !== undefined) return true;
      else throw new Error(ErrorMessages.UserCouldNotFound);
    }

    return false;
  }

  async generateToken(
    payload: string | Record<string, unknown> | Buffer,
    options?: JwtSignOptions
  ): Promise<string> {
    return this.jwtService.sign(payload, options);
  }

  async verifyToken(token: string): Promise<Record<string, unknown>> {
    return this.jwtService.verify(token);
  }
}

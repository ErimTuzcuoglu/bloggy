import jwt from 'jsonwebtoken';

export default class JWTHandler {
  public static generateToken(args: any, hashKey: string, expiresIn = '30m') {
    return jwt.sign(args, hashKey, { expiresIn: expiresIn });
  }
}

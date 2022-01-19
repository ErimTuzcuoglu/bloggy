import { Environments } from '@domain/enum';

export function setEnvironment(): Array<string> | string {
  switch (process.env.NODE_ENV) {
    case Environments.development:
      return ['.env.development', '.env'];
    case Environments.production:
    default:
      return '.env';
  }
}

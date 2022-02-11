export class LoginUserResponseViewModel {
  constructor(data?: Partial<LoginUserResponseViewModel>) {
    Object.assign(this, data);
  }
  id: string;
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}

export class RefreshTokenUserResponseViewModel {
  constructor(data: Partial<RefreshTokenUserResponseViewModel>) {
    Object.assign(this, data);
  }
  accessToken: string;
  refreshToken: string;
}

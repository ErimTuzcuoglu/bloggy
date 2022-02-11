export class AddUserResponseViewModel {
  constructor(data?: Partial<AddUserResponseViewModel>) {
    Object.assign(this, data);
  }

  id: string;
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}

export class UpdateUserResponseViewModel {
  constructor(data?: Partial<UpdateUserResponseViewModel>) {
    Object.assign(this, data);
  }
  id: string;
  email: string;
  name: string;
}

export class DeleteUserResponseViewModel {
  constructor(data?: Partial<DeleteUserResponseViewModel>) {
    Object.assign(this, data);
  }

  isUserDeleted: true;
}

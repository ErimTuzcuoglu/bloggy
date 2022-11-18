export class UpdatePostResponseViewModel {
  constructor(data?: Partial<UpdatePostResponseViewModel>) {
    Object.assign(this, data);
  }

  id: string;
  userId: string;
  tags: Array<Record<string, string>>;
  coverPhoto?: string;
  title: string;
  post: string;
}

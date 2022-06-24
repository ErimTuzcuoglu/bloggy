export class AddPostResponseViewModel {
  constructor(data?: Partial<AddPostResponseViewModel>) {
    Object.assign(this, data);
  }

  id: string;
  userId: string;
  tags: Array<Record<string, string>>;
  coverPhoto?: string;
  title: string;
  post: string;
}

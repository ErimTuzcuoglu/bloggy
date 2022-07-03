import { Expose } from 'class-transformer';

export class GetPostResponseViewModel {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  post: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  userId: string;

  @Expose()
  coverPhoto?: string;

  @Expose()
  tags?: Array<Record<string, unknown>>;
}

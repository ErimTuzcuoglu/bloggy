import { Expose } from 'class-transformer';

export class GetPostResponseViewModel {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;
}

import { Expose } from 'class-transformer';

export class UpdatePostRequestViewModel {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;
}

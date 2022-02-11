import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSchema } from '@domain/schemas';
import { ErrorMessages } from '@domain/enum';
import { GetUserResponseViewModel } from '@presentation/view-models';
import Mapper from '@infrastructure/helper/Mapper';

export class GetUserQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<UserSchema>,
    private mapper: Mapper
  ) {}

  async execute(query: GetUserQuery): Promise<UserSchema> {
    const user: UserSchema = await this.usersRepository.findOne(query.id);
    if (user === undefined) throw new Error(ErrorMessages.UserCouldNotFound);

    return this.mapper.toViewModel<UserSchema, GetUserResponseViewModel>(
      user,
      GetUserResponseViewModel
    ) as unknown as UserSchema;
  }
}

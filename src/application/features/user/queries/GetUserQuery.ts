import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSchema } from '@domain/schemas';
import { ErrorMessages } from '@domain/enum';

export class GetUserQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<UserSchema>
  ) {}

  async execute(query: GetUserQuery): Promise<UserSchema> {
    const user = this.usersRepository.findOne(query.id);
    if (user === undefined) throw new Error(ErrorMessages.UserCouldNotFound);
    return user;
  }
}

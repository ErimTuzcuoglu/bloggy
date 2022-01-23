import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSchema } from '@domain/schemas';

export class UpdateUserCommand {}

@QueryHandler(UpdateUserCommand)
export class UpdateUserHandler implements IQueryHandler<UpdateUserCommand> {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<UserSchema>
  ) {}

  async execute(): Promise<Array<UserSchema>> {
    return this.usersRepository.find();
  }
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSchema } from '@domain/schemas';
import { GetUserResponseViewModel } from '@presentation/view-models';
import Mapper from '@infrastructure/helper/Mapper';

export class GetUsersQuery {}

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<UserSchema>,
    private mapper: Mapper
  ) {}

  async execute(): Promise<Array<GetUserResponseViewModel>> {
    const users: Array<UserSchema> = await this.usersRepository.find();
    const mapped = this.mapper.toViewModel<UserSchema, GetUserResponseViewModel>(
      JSON.parse(JSON.stringify(users)),
      GetUserResponseViewModel
    );

    return Array.isArray(mapped) ? mapped : [mapped];
  }
}

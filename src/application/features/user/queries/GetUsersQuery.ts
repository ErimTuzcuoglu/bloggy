import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class GetUsersQuery {}

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  async execute(): Promise<string> {
    return 'Welcome';
  }
}

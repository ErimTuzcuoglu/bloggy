import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSchema } from '@domain/schemas';
import { DeleteUserResponseViewModel } from '@presentation/view-models';

export class DeleteUserCommand {
  constructor(public readonly id: string) {}
}

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @InjectRepository(UserSchema)
    private usersRepository: Repository<UserSchema>
  ) {}
  async execute(command: DeleteUserCommand): Promise<DeleteUserResponseViewModel> {
    await this.usersRepository.delete({ id: command.id });

    return new DeleteUserResponseViewModel({
      isUserDeleted: true
    });
  }
}

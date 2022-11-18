import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostSchema } from '@domain/schemas';
// import { ErrorMessages } from '@domain/enum';

export class DeletePostCommand {
  constructor(public readonly userId: string, public readonly postId: string) {}
}

@CommandHandler(DeletePostCommand)
export class DeletePostHandler implements ICommandHandler<DeletePostCommand> {
  constructor(
    @InjectRepository(PostSchema)
    private postsRepository: Repository<PostSchema>
  ) {}

  async execute(command: DeletePostCommand): Promise<boolean> {
    // const userInDB = await this.postsRepository.findOne(command.userId);
    // if (userInDB !== undefined) throw new Error(ErrorMessages.UserAlreadyExist);

    this.postsRepository.save({
      id: command.postId,
      isDeleted: true
    });

    return true;
  }
}

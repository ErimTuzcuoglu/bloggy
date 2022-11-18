import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { PostSchema, TagSchema, UserSchema } from '@domain/schemas';
import { AddPostResponseViewModel } from '@presentation/view-models';
import { ErrorMessages } from '@domain/enum';

type RequestedTagType = {
  id?: string;
  name?: string;
};

type AddPostCommandParams = {
  coverPhoto: string;
  post: string;
  title: string;
  userId: string;
  tags: Array<RequestedTagType>;
};

export class AddPostCommand {
  constructor(public readonly postData: AddPostCommandParams) {}
}

@CommandHandler(AddPostCommand)
export class AddPostHandler implements ICommandHandler<AddPostCommand> {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager
  ) {}

  async execute(command: AddPostCommand): Promise<AddPostResponseViewModel> {
    const { coverPhoto, post, tags = [], title, userId } = command.postData;

    const result = await this.entityManager.transaction(
      async (transactionalManager: EntityManager) => {
        const userInDB = await transactionalManager.getRepository(UserSchema).findOne(userId);
        if (!!!userInDB) throw new Error(ErrorMessages.UserCouldNotFound);
        let newTags;
        const addedTags = [],
          existingTags = [];
        tags.forEach((tag) => {
          if (tag.name) {
            addedTags.push({ tag: tag.name } as Partial<TagSchema>);
          } else if (tag.id) {
            existingTags.push(tag.id);
          }
        });
        if (addedTags.length > 0) {
          newTags = await transactionalManager
            .createQueryBuilder()
            .insert()
            .into(TagSchema)
            .values(addedTags)
            .returning(['tag'])
            .execute();
        }
        const selectedTags = await transactionalManager
          .getRepository(TagSchema)
          .findByIds(existingTags);

        //CLUE: If you want to insert into related tables, create a new entity instance first.
        let savedPost = await transactionalManager.getRepository(PostSchema).create({
          coverPhoto,
          post,
          title,
          user: userInDB,
          tags: [
            ...selectedTags,
            ...(Array.isArray(newTags?.generatedMaps) && newTags?.generatedMaps?.length > 0
              ? newTags.generatedMaps
              : [])
          ]
        });
        savedPost = await transactionalManager.save(savedPost);
        return savedPost;
      }
    );
    const mappedTags = (await result.tags).map(({ id, tag }) => {
      return { id, tag };
    });
    return new AddPostResponseViewModel({
      coverPhoto: coverPhoto,
      id: result.id,
      post: result.post,
      tags: mappedTags,
      title: result.title,
      userId: result.user.id
    });
  }
}

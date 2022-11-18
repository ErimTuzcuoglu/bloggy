import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, InsertResult } from 'typeorm';
import { PostSchema, TagSchema, UserSchema } from '@domain/schemas';
import { UpdatePostResponseViewModel } from '@presentation/view-models';
import { ErrorMessages } from '@domain/enum';

type RequestedTagType = {
  id?: string;
  name?: string;
};

type UpdatePostCommandParams = {
  postId: string;
  coverPhoto: string;
  post: string;
  title: string;
  userId: string;
  tags: Array<RequestedTagType>;
};
export class UpdatePostCommand {
  constructor(public readonly postData: UpdatePostCommandParams) {}
}

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand> {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager
  ) {}

  async execute(command: UpdatePostCommand): Promise<UpdatePostResponseViewModel> {
    const { coverPhoto, post, postId, tags = [], title, userId } = command.postData;

    const result = await this.entityManager.transaction(
      async (transactionalManager: EntityManager) => {
        const userInDB = await transactionalManager.getRepository(UserSchema).findOne(userId);
        if (!!!userInDB) throw new Error(ErrorMessages.UserCouldNotFound);
        let newTags: InsertResult;
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

        //TODO: Tags that not used anymore will delete here.

        let savedPost: PostSchema = await transactionalManager
          .getRepository(PostSchema)
          .findOne(postId);

        Object.assign(savedPost, {
          coverPhoto,
          post,
          title,
          user: userInDB,
          tags: [
            ...selectedTags,
            ...(Array.isArray(newTags?.generatedMaps) && newTags?.generatedMaps?.length > 0
              ? newTags.generatedMaps
              : [])
          ] as TagSchema[]
        });

        savedPost = await transactionalManager.save(savedPost);
        return savedPost;
      }
    );
    const mappedTags = (await result.tags).map(({ id, tag }) => {
      return { id, tag };
    });
    return new UpdatePostResponseViewModel({
      coverPhoto: coverPhoto,
      id: result.id,
      post: result.post,
      tags: mappedTags,
      title: result.title,
      userId: result.user.id
    });
  }
}

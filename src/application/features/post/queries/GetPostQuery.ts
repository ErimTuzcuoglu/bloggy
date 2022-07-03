import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostSchema } from '@domain/schemas';
import { ErrorMessages } from '@domain/enum';
import { GetPostResponseViewModel } from '@presentation/view-models';
import Mapper from '@infrastructure/helper/Mapper';

export class GetPostQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetPostQuery)
export class GetPostHandler implements IQueryHandler<GetPostQuery> {
  constructor(
    @InjectRepository(PostSchema)
    private postsRepository: Repository<PostSchema>,
    private mapper: Mapper
  ) {}

  async execute(query: GetPostQuery): Promise<PostSchema> {
    const post: PostSchema = await this.postsRepository.findOne(query.id);
    if (post === undefined) throw new Error(ErrorMessages.PostCouldNotFound);

    return this.mapper.toViewModel<PostSchema, GetPostResponseViewModel>(
      post,
      GetPostResponseViewModel
    ) as unknown as PostSchema;
  }
}

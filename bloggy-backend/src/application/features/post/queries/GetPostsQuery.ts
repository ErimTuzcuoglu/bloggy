import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostSchema } from '@domain/schemas';
import { ErrorMessages } from '@domain/enum';
import { GetPostResponseViewModel } from '@presentation/view-models';
import Mapper from '@infrastructure/helper/Mapper';

export class GetPostsQuery {}

@QueryHandler(GetPostsQuery)
export class GetPostsHandler implements IQueryHandler<GetPostsQuery> {
  constructor(
    @InjectRepository(PostSchema)
    private postsRepository: Repository<PostSchema>,
    private mapper: Mapper
  ) {}

  async execute(): Promise<Array<GetPostResponseViewModel>> {
    const posts: PostSchema[] = await this.postsRepository.find();
    if (posts.length === 0) throw new Error(ErrorMessages.ThereIsNoPostsYet);

    const mapped = this.mapper.toViewModel<PostSchema, GetPostResponseViewModel>(
      JSON.parse(JSON.stringify(posts)),
      GetPostResponseViewModel
    );

    return Array.isArray(mapped) ? mapped : [mapped];
  }
}

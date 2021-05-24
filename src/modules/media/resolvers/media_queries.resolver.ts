import { Args, Query, Resolver } from '@nestjs/graphql';
// import { CurrentUser, AuthJwt } from 'src/decorators/common.decorator';
// import { User } from '../../users/entities/users.entity';
import { MediaArgs } from '../dto/media.args';
import { MediaEntity } from '../entities/media.entity';
import { MediaService } from '../services/media.service';
import { MediaConnection } from '../entities/media.entity';
import { GqlCookieAuthGuard } from 'src/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => MediaEntity)
export class MediaQueriesResolver {
  constructor(private readonly mediaService: MediaService) {}

  @UseGuards(GqlCookieAuthGuard)
  @Query(() => MediaConnection, {
    nullable: true,
    name: 'medias',
  })
  async medias(@Args() args: MediaArgs) {
    return this.mediaService.pagination({
      page: args.page,
      limit: args.limit,
      parentId: args.parentId,
    });
  }

  @UseGuards(GqlCookieAuthGuard)
  @Query(() => MediaEntity, {
    nullable: true,
    name: 'media',
  })
  async media(@Args('id') id: number) {
    return this.mediaService.findById(id);
  }
}

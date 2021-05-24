import { Max, Min } from 'class-validator';
import { ArgsType, Field, Int } from '@nestjs/graphql';
import { PaginateOptions } from 'src/modules/common/common.repository';
import { Post } from 'src/modules/post/entities/post.entity';

@ArgsType()
export class PostArgs {
  @Field(() => Int, {
    defaultValue: 15,
  })
  @Min(0)
  @Max(100)
  limit: number;

  @Field(() => Int, {
    defaultValue: 1,
  })
  page: number;
}

@ArgsType()
export class PostCursorFindOptions implements PaginateOptions<Post, any> {
  @Field(() => Int, { defaultValue: 10, nullable: true })
  first: number;

  @Field(() => String, { nullable: true })
  after?: string;

  @Field(() => String, { description: 'Pass input type of search value' })
  type: string;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  validateCursor: boolean;

  @Field(() => String, { description: 'Pass the key value to search and sort data' })
  cursorKey: string;
}

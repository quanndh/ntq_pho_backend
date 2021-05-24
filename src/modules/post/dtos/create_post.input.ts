import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => [Number], { nullable: true, defaultValue: [] })
  medias: number[];

  @Field({ defaultValue: "" })
  caption?: string;

  @Field({ defaultValue: "" })
  rawCaption?: string;

  @Field({ defaultValue: true })
  isPublic?: boolean;
}

@InputType()
export class UpdatePostInput extends CreatePostInput {
  @Field()
  id: number;
}

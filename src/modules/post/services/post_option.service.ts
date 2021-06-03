import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { ApolloError } from "apollo-server-errors";
import { PostOption } from "src/modules/post/entities/post_option.entity";
import { PostOptionRepostory } from "src/modules/post/repositories/post_option.repository";
import { PostService } from "src/modules/post/services/post.service";
import { DeepPartial } from "typeorm";

@Injectable()
export class PostOptionService {
  constructor(
    private readonly postOptionRepo: PostOptionRepostory,
    @Inject(forwardRef(() => PostService))
    private readonly postService: PostService
  ) {}

  getOptionOfPost = async (postId: number) => {
    try {
      return await this.postOptionRepo.find({
        where: { postId },
        order: { createdAt: "ASC" },
      });
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  createOption = async (postId: number, content: string) => {
    try {
      const post = await this.postService.findById(postId);
      if (!post) {
        throw new ApolloError("Bài viết không tồn tại");
      }
      const newOption = this.postOptionRepo.create({ postId, content });
      return await this.postOptionRepo.save(newOption);
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  saveOptions = async (options: DeepPartial<PostOption>[], postId: number) => {
    try {
      console.log(postId);
      for (let i = 0; i < options.length; i++) {
        const newOptions = await this.postOptionRepo.create({
          ...options[i],
          postId,
        });
        await this.postOptionRepo.save(newOptions);
      }
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  voteOption = async (postId: number, optionId: number, userId: number) => {
    try {
      const post = await this.postService.findById(postId);
      if (!post) {
        throw new ApolloError("Bài viết không tồn tại");
      }
      const option = await this.postOptionRepo.findOne(optionId);
      if (!option) {
        throw new ApolloError("Lựa chọn không tồn tại");
      }
      const findIndex = option.voted.findIndex((item) => {
        return Number(item) === Number(userId);
      });
      if (findIndex !== -1) {
        option.voted.splice(findIndex, 1);
      } else {
        option.voted.push(userId);
      }
      await this.postOptionRepo.update({ id: optionId }, { ...option });
      return option;
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };

  deleteOption = async (postId: number, optionId: number, userId: number) => {
    try {
      const post = await this.postService.findById(postId);
      if (!post) {
        throw new ApolloError("Bài viết không tồn tại");
      }
      const option = await this.postOptionRepo.findOne(optionId);
      if (!option) {
        throw new ApolloError("Lựa chọn không tồn tại");
      }
      if (Number(post.creatorId) !== Number(userId)) {
        throw new ApolloError("Bạn không có quyền xoá");
      }

      await this.postOptionRepo.delete(option.id);

      return true;
    } catch (error) {
      throw new ApolloError(error.message);
    }
  };
}

import { Injectable } from '@nestjs/common';
import { MediaRepository } from '../repositories/media.repository';
import { MediaEntity } from '../entities/media.entity';
import { DeepPartial } from 'typeorm';

@Injectable()
export class MediaService {
  constructor(private readonly mediaRepository: MediaRepository) {}

  addMedia = async (data: DeepPartial<MediaEntity>) => {
    const media = this.mediaRepository.create(data);
    return await this.mediaRepository.save(media);
  };

  removeMedia = async (id: number | string) => {
    const media = await this.mediaRepository.findOneOrFail(id, {
      where: {
        isDeleted: false,
      },
    });
    media.isDeleted = true;
    return this.mediaRepository.save(media);
  };

  find = async (orderId: string): Promise<MediaEntity[]> => {
    const medias = await this.mediaRepository.find({
      where: { orderId },
    });
    return medias;
  };

  findById = async (id: number): Promise<MediaEntity | undefined> => {
    if (!id) return undefined;
    return await this.mediaRepository.findOneOrFail({ id });
  };

  updateMedia = async (data: { id: string; name: string }) => {
    await this.mediaRepository.update(data.id, { name: data.name });
    return this.mediaRepository.findOneOrFail(data.id);
  };

  update = async (id: string, data): Promise<MediaEntity | undefined> => {
    await this.mediaRepository.update(id, data);
    return this.mediaRepository.findOneOrFail(id);
  };

  async pagination({ page, limit }: { parentId?: string; page?: number; limit?: number }) {
    return this.mediaRepository.paginate({ page, limit });
  }
}

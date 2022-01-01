import { Injectable } from '@nestjs/common';
import { Hashtag } from '@prisma/client';
import { IHashtagsRepository } from 'src/modules/hashtag/repositories/IHashtagsRepository';
import { PrismaService } from '../../../../../providers/prisma.service';

@Injectable()
export class HashtagRepositoryService implements IHashtagsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(
    instagramAccountId: string,
    hashtag: string,
  ): Promise<Hashtag> {
    const hashtagCreated = await this.prismaService.hashtag.create({
      data: {
        hashtag,
        InstagramAccount: {
          connect: {
            id: instagramAccountId,
          },
        },
      },
    });

    return hashtagCreated;
  }

  public async UpdateHashtagThatAlreadyExists(
    instagramAccountId: string,
    hashtag: string,
  ): Promise<Hashtag> {
    const hashtagUpdate = await this.prismaService.hashtag.update({
      data: {
        InstagramAccount: {
          connect: {
            id: instagramAccountId,
          },
        },
      },
      where: {
        hashtag,
      },
    });

    return hashtagUpdate;
  }

  public async findOne(hashtag: string): Promise<Hashtag> {
    return await this.prismaService.hashtag.findUnique({
      where: {
        hashtag,
      },
    });
  }

  public async delete(id: string): Promise<Hashtag> {
    const hashtag = await this.prismaService.hashtag.delete({
      where: {
        id,
      },
    });

    return hashtag;
  }
}

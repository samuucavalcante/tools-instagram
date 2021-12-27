import { Injectable } from '@nestjs/common';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { UpdateHashtagDto } from './dto/update-hashtag.dto';
import { PrismaService } from '../../providers/prisma.service';
import { HashtagRepositoryService } from './infra/prisma/repositories/HashtagRepositoryService';

@Injectable()
export class HashtagsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashtagRespositoryService: HashtagRepositoryService,
  ) {}
  async create(instagramAccountId, { hashtag }: CreateHashtagDto) {
    const hashtagAlreadyExists = await this.hashtagRespositoryService.findOne(
      hashtag,
    );

    if (hashtagAlreadyExists) {
      return await this.hashtagRespositoryService.UpdateHashtagThatAlreadyExists(
        instagramAccountId,
        hashtag,
      );
    }

    const hashtagCreated = await this.hashtagRespositoryService.create(
      instagramAccountId,
      hashtag,
    );

    return hashtagCreated;
  }
  findAll() {
    return `This action returns all hashtags`;
  }

  findOne(hashtag: string) {
    const findHashtag = this.prismaService.hashtag.findUnique({
      where: {
        hashtag,
      },
    });

    return findHashtag;
  }

  update(id: number, updateHashtagDto: UpdateHashtagDto) {
    return `This action updates a #${id} hashtag`;
  }

  // public async updateHashtagAlreadExists(
  //   instagramAccountId,
  //   { hashtag }: CreateHashtagDto,
  // ) {}

  remove(id: number) {
    return `This action removes a #${id} hashtag`;
  }
}

import { Hashtag } from '@prisma/client';

export interface IHashtagsRepository {
  create(instagramAccountId: string, hashtag: string): Promise<Hashtag>;

  UpdateHashtagThatAlreadyExists(
    instagramAccountId: string,
    hashtag: string,
  ): Promise<Hashtag>;

  findOne(hashtag: string): Promise<Hashtag>;
}

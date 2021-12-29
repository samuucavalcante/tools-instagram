import { Injectable } from '@nestjs/common';
import { CreateInstagramAccountDto } from './dto/create-instagramaccount.dto';
import { InstagramAccountRepositoryService } from './infra/repositories/InstagramAccountRepositoryService';
import { UserRepositoryService } from '../users/infra/repositories/UserRepositoryService';

@Injectable()
export class InstagramaccountService {
  constructor(
    private readonly instagramAccountRepositoryService: InstagramAccountRepositoryService,
    private readonly userRepositoryService: UserRepositoryService,
  ) {}
  async create(id: string, { username, password }: CreateInstagramAccountDto) {
    const user = await this.instagramAccountRepositoryService.create(id, {
      username,
      password,
    });

    return user;
  }

  async findInstagramAccount(id: string) {
    const userWithIntagramAccountsAndHashtags =
      await this.userRepositoryService.findUserById(id);

    return userWithIntagramAccountsAndHashtags;
  }
}

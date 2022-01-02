import { Injectable } from '@nestjs/common';
import { CreateOrUpdateInstagramAccountDto } from './dto/create-instagramaccount.dto';
import { InstagramAccountRepositoryService } from './infra/repositories/InstagramAccountRepositoryService';
import { UserRepositoryService } from '../users/infra/repositories/UserRepositoryService';

@Injectable()
export class InstagramaccountService {
  constructor(
    private readonly instagramAccountRepositoryService: InstagramAccountRepositoryService,
    private readonly userRepositoryService: UserRepositoryService,
  ) {}
  async create(
    id: string,
    { username, password }: CreateOrUpdateInstagramAccountDto,
  ) {
    const instagramAccount =
      await this.instagramAccountRepositoryService.create(id, {
        username,
        password,
      });

    return instagramAccount;
  }

  async findInstagramAccount(id: string) {
    const userWithIntagramAccountsAndHashtags =
      await this.userRepositoryService.findUserById(id);

    return userWithIntagramAccountsAndHashtags;
  }

  async update(
    instagramAccountId: string,
    dto: CreateOrUpdateInstagramAccountDto,
  ) {
    const instagramAccount = this.instagramAccountRepositoryService.update(
      instagramAccountId,
      dto,
    );

    return instagramAccount;
  }

  async getInstagramAccountsByUser(id: string) {
    const instagramAccounts =
      await this.instagramAccountRepositoryService.getInstagramAccountsByUser(
        id,
      );

    return instagramAccounts;
  }
}

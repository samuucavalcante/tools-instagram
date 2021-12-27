import { Injectable } from '@nestjs/common';
import { CreateInstagramAccountDto } from './dto/create-instagramaccount.dto';
import { InstagramAccountRepositoryService } from './infra/repositories/InstagramAccountRepositoryService';

@Injectable()
export class InstagramaccountService {
  constructor(
    private readonly instagramAccountRepositoryService: InstagramAccountRepositoryService,
  ) {}
  async create(id: string, { username, password }: CreateInstagramAccountDto) {
    const user = await this.instagramAccountRepositoryService.create(id, {
      username,
      password,
    });

    return user;
  }
}

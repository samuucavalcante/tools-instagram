import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';
import { CreateInstagramAccountDto } from '../../dto/create-instagramaccount.dto';
import { IInstagramAccountRepository } from '../../repositories/IInstagramAccountRepository';
@Injectable()
class InstagramAccountRepositoryService implements IInstagramAccountRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(id: string, { username, password }: CreateInstagramAccountDto) {
    const user = await this.prismaService.intagramAccount.create({
      data: {
        username,
        password,
        userId: id,
      },
    });
    return user;
  }
}

export { InstagramAccountRepositoryService };

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';
import { CreateOrUpdateInstagramAccountDto } from '../../dto/create-instagramaccount.dto';
import { IInstagramAccountRepository } from '../../repositories/IInstagramAccountRepository';
import { IntagramAccount } from '@prisma/client';

@Injectable()
class InstagramAccountRepositoryService implements IInstagramAccountRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(
    id: string,
    { username, password }: CreateOrUpdateInstagramAccountDto,
  ) {
    const InstagramAccount = await this.prismaService.intagramAccount.create({
      data: {
        username,
        password,
        userId: id,
      },
    });
    return InstagramAccount;
  }

  public async update(
    id: string,
    dto: CreateOrUpdateInstagramAccountDto,
  ): Promise<IntagramAccount> {
    const user = await this.prismaService.intagramAccount.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });

    return user;
  }
}

export { InstagramAccountRepositoryService };

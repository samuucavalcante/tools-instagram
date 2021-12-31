import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User, Hashtag } from '@prisma/client';
import { IUserRepository } from '../../repositories/IUserRepository';

@Injectable()
export class UserRepositoryService implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ email, name, password }: CreateUserDto): Promise<User> {
    const user = await this.prismaService.user.create({
      data: {
        password,
        email,
        name: name,
      },
    });

    return user;
  }
  public async findUserByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
      include: {
        _count: true,
        instagramAccounts: {
          include: {
            _count: true,
            Hashtag: true,
          },
        },
      },
    });
  }

  public async findUserById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        _count: true,
        instagramAccounts: {
          include: {
            _count: true,
            Hashtag: true,
          },
        },
      },
    });
    return user;
  }
}

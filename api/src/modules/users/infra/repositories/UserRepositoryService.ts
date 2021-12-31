import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '@prisma/client';
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
      select: {
        password: true,
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
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
        instagramAccounts: {
          select: {
            id: true,
            username: true,
            password: true,
            active: true,
            Hashtag: {
              select: {
                id: true,
                hashtag: true,

                createdAt: true,
                updatedAt: true,
              },
            },
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
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        createdAt: true,
        updatedAt: true,
        instagramAccounts: {
          select: {
            id: true,
            username: true,
            password: true,
            active: true,
            Hashtag: {
              select: {
                id: true,
                hashtag: true,

                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });
    return user;
  }
}

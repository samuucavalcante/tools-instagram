import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/providers/prisma.service';
import { CreateUserDto } from '../../dto/create-user.dto';
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
    });
  }

  public async findUserById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }
}

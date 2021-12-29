import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { IAuthRepositoryContract } from 'src/modules/auth/contracts/IAuthRepositoryContract';
import { PrismaService } from '../../../../../providers/prisma.service';
import { CreateUserDto } from '../../../../users/dto/create-user.dto';

@Injectable()
export class AuthRepository implements IAuthRepositoryContract {
  constructor(private readonly prismaService: PrismaService) {}
  async create({
    email,
    name,
    password,
  }: CreateUserDto): Promise<Omit<User, 'password'>> {
    const user = await this.prismaService.user.create({
      data: {
        password,
        email,
        name: name,
      },
      select: {
        password: false,
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }
  public async findByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async findById(id: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }
}

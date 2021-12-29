import {
  Injectable,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthLoginDto } from './dto/create-auth.dto';
import { BcriptService } from 'src/modules/users/providers/bcript.service';
import { User } from '@prisma/client';
import { RegisterUserDto } from './dto/register-user-dto';
import { UserRepositoryService } from '../users/infra/repositories/UserRepositoryService';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly bcriptService: BcriptService,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepositoryService,
    private readonly usersService: UsersService,
  ) {}

  async login({ email, password }: AuthLoginDto) {
    const user = await this.usersService.validateUserSignIn(email, password);
    delete user.password;

    const payload = {
      userId: user.id,
    };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async createUser({ email, name, password }: RegisterUserDto): Promise<User> {
    const findByEmail = await this.userRepository.findUserByEmail(email);

    if (findByEmail) {
      throw new HttpException('Email already exists', 400);
    }

    const hashpassoword = await this.bcriptService.hashPassword(password);

    const user = await this.usersService.create({
      name,
      email,
      password: hashpassoword,
    });

    delete user.password;

    return user;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findUserById(id);

    delete user.password;

    return user;
  }
}

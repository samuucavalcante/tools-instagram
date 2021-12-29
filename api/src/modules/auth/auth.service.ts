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
import { AuthRepository } from './infra/prisma/repositories/AuthRepository';

@Injectable()
export class AuthService {
  constructor(
    private readonly bcriptService: BcriptService,
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);
    delete user.password;

    const payload = {
      userId: user.id,
    };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { email, password } = authLoginDto;

    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const validadePassword = await this.bcriptService.validatePassword(
      password,
      user.password,
    );

    if (!validadePassword) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async createUser({
    email,
    name,
    password,
  }: RegisterUserDto): Promise<Omit<User, 'password'>> {
    const findByEmail = await this.authRepository.findByEmail(email);

    if (findByEmail) {
      throw new HttpException('Email already exists', 400);
    }

    const hashpassoword = await this.bcriptService.hashPassword(password);

    const user = await this.authRepository.create({
      name,
      email,
      password: hashpassoword,
    });

    return user;
  }

  async findUserById(id: string): Promise<User> {
    return await this.authRepository.findById(id);
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepositoryService } from './infra/repositories/UserRepositoryService';
import { BcriptService } from './providers/bcript.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly bcriptService: BcriptService,
    private readonly userRepository: UserRepositoryService,
  ) {}

  async create({ name, email, password }: CreateUserDto) {
    const findByEmail = await this.findByEmail(email);

    if (findByEmail) {
      throw new HttpException('Email already exists', 400);
    }

    const hashpassoword = await this.bcriptService.hashPassword(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashpassoword,
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);

    return user;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findById(id);
    delete user.password;

    return user;
  }
}

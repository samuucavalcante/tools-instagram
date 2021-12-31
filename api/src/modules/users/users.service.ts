import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepositoryService } from './infra/repositories/UserRepositoryService';
import { BcriptService } from './providers/bcript.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly bcriptService: BcriptService,
    private readonly userRepository: UserRepositoryService,
  ) {}

  public async create({ name, email, password }: CreateUserDto) {
    const findByEmail = await this.userRepository.findUserByEmail(email);

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

  public async validateUserSignIn(email: string, password: string) {
    const user = await this.userRepository.findUserByEmail(email);

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

  public async getUser(id: string) {
    return await this.userRepository.findUserById(id);
  }
}

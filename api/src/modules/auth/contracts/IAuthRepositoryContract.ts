import { User } from '@prisma/client';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export interface IAuthRepositoryContract {
  create(dto: CreateUserDto): Promise<Omit<User, 'password'>>;
}

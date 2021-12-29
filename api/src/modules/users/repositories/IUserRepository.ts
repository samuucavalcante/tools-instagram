import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IUserRepository {
  findUserByEmail(email: string): Promise<User>;
  create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>>;
  findUserById(id: string): Promise<User>;
}

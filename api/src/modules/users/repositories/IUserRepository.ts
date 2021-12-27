import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IUserRepository {
  findByEmail(email: string): Promise<User>;
  create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>>;
  findById(id: string): Promise<User>;
}

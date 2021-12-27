import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { BcriptService } from './providers/bcript.service';
import { PrismaService } from 'src/providers/prisma.service';
import { UserRepositoryService } from './infra/repositories/UserRepositoryService';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    BcriptService,
    UserRepositoryService,
  ],
  exports: [UsersService],
})
export class UsersModule {}

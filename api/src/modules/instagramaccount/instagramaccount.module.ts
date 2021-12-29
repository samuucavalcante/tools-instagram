import { Module } from '@nestjs/common';
import { InstagramaccountService } from './instagramaccount.service';
import { InstagramaccountController } from './instagramaccount.controller';
import { PrismaService } from '../../providers/prisma.service';
import { InstagramAccountRepositoryService } from './infra/repositories/InstagramAccountRepositoryService';
import { UserRepositoryService } from '../users/infra/repositories/UserRepositoryService';

@Module({
  imports: [PrismaService],
  controllers: [InstagramaccountController],
  providers: [
    InstagramaccountService,
    PrismaService,
    InstagramAccountRepositoryService,
    UserRepositoryService,
  ],
})
export class InstagramaccountModule {}

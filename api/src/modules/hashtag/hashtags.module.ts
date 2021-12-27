import { Module } from '@nestjs/common';
import { HashtagsService } from './hashtags.service';
import { HashtagsController } from './hashtags.controller';
import { PrismaService } from '../../providers/prisma.service';
import { HashtagRepositoryService } from './infra/prisma/repositories/HashtagRepositoryService';

@Module({
  controllers: [HashtagsController],
  providers: [HashtagsService, PrismaService, HashtagRepositoryService],
})
export class HashtagsModule {}

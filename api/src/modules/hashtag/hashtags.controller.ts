import { Controller, Post, Body, Param } from '@nestjs/common';
import { HashtagsService } from './hashtags.service';
import { CreateHashtagDto } from './dto/create-hashtag.dto';

@Controller('hashtags')
export class HashtagsController {
  constructor(private readonly hashtagsService: HashtagsService) {}

  @Post(':id')
  async create(
    @Param('id') instagramAccountId: string,
    @Body() createHashtagDto: CreateHashtagDto,
  ) {
    return await this.hashtagsService.create(
      instagramAccountId,
      createHashtagDto,
    );
  }
}

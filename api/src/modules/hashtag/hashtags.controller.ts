import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
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

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.hashtagsService.remove(id);
  }
}

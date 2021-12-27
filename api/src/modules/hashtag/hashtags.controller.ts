import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { HashtagsService } from './hashtags.service';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { UpdateHashtagDto } from './dto/update-hashtag.dto';

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

  @Get()
  findAll() {
    return this.hashtagsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.hashtagsService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHashtagDto: UpdateHashtagDto) {
    return this.hashtagsService.update(+id, updateHashtagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hashtagsService.remove(+id);
  }
}

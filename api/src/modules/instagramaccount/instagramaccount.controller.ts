import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { InstagramaccountService } from './instagramaccount.service';
import { CreateInstagramAccountDto } from './dto/create-instagramaccount.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('instagramaccount')
export class InstagramaccountController {
  constructor(
    private readonly instagramaccountService: InstagramaccountService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async create(
    @Param('id') userId: string,
    @Body() dto: CreateInstagramAccountDto,
  ) {
    return await this.instagramaccountService.create(userId, dto);
  }

  // @Get()
  // findAll() {
  //   return this.instagramaccountService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.instagramaccountService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateInstagramaccountDto: UpdateInstagramaccountDto,
  // ) {
  //   return this.instagramaccountService.update(+id, updateInstagramaccountDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.instagramaccountService.remove(+id);
  // }
}

import { Controller, Post, Body, Param } from '@nestjs/common';
import { InstagramaccountService } from './instagramaccount.service';
import { CreateInstagramAccountDto } from './dto/create-instagramaccount.dto';

@Controller('instagramaccount')
export class InstagramaccountController {
  constructor(
    private readonly instagramaccountService: InstagramaccountService,
  ) {}

  @Post(':id')
  async create(
    @Param('id') id: string,
    @Body() createInstagramaccountDto: CreateInstagramAccountDto,
  ) {
    console.log(id, createInstagramaccountDto);
    return await this.instagramaccountService.create(
      id,
      createInstagramaccountDto,
    );
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

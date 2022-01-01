import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Patch,
  Param,
} from '@nestjs/common';
import { InstagramaccountService } from './instagramaccount.service';
import { CreateOrUpdateInstagramAccountDto } from './dto/create-instagramaccount.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('instagramaccount')
export class InstagramaccountController {
  constructor(
    private readonly instagramaccountService: InstagramaccountService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateOrUpdateInstagramAccountDto, @Request() req) {
    const userId = req.user.userId;
    return await this.instagramaccountService.create(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Body() dto: CreateOrUpdateInstagramAccountDto,
    @Param('id') instagramAccountId: string,
  ) {
    return await this.instagramaccountService.update(instagramAccountId, dto);
  }
}

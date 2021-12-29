import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/create-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RegisterUserDto } from './dto/register-user-dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async login(@Body() dto: AuthLoginDto) {
    return await this.authService.login(dto);
  }

  @Post('signup')
  async register(@Body() dto: RegisterUserDto) {
    return await this.authService.createUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('token')
  async test(@Request() req) {
    const userId = req.user.userId;
    return await this.authService.findUserById(userId);
  }
}

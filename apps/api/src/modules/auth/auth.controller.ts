import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('telegram')
  authenticateTelegram(@Body() payload: { initData: string }) {
    return this.authService.authenticateTelegram(payload.initData);
  }
}

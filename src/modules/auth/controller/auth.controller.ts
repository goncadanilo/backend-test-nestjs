import { Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../service/auth.service';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  @HttpCode(200)
  async login(@Req() req: any) {
    return this.authService.login(req.user);
  }
}

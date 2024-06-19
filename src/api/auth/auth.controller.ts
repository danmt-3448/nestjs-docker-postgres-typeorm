import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token.guard';
import { LocalAuthGuard } from './guards/local.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  @UsePipes(new ValidationPipe())
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('/sign-up')
  @UsePipes(new ValidationPipe())
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post('refresh-token')
  async refreshAccessToken(@Req() req: RefreshTokenDto) {
    const { id } = req;
    return this.authService.refreshToken(id);
  }
}

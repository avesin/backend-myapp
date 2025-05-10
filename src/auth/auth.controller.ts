import { Body, Controller, Get, Headers, Post, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsernameDto } from './dto/username.dto';
import { AppDto } from 'src/app.dto';
import { AuthGuard } from '@nestjs/passport';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('Authentication')
@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async login(@Body() loginDto: LoginDto) {
    const res = await this.authService.login(loginDto);
    return new AppDto(res.code, res.message, res.data);
  }

  @Get('check-username')
  @ApiResponse({ status: 200, description: 'Check Username' })
  async checkusername(@Query() usernameDto: UsernameDto) {
    const res = await this.authService.checkusername(usernameDto);
    return new AppDto(res.code, res.message, res.data);
  }


  @ApiBearerAuth()
  @Post('refresh-token')
  @ApiResponse({ status: 200, description: 'Request New Token' })
  async refreshToken(@Headers('authorization') authorization: string, @Body() refreshToken: RefreshTokenDto) {
    const accessToken = authorization?.startsWith('Bearer ')
      ? authorization.slice(7)
      : null;
    if (accessToken != null) {
      const res = await this.authService.refreshToken(accessToken, refreshToken.refresh_token);
      if (res != null) {
        return new AppDto(200, "Success Get New Token", {
          access_token: res.token,
          refresh_token: res.refresh_token
        })
      }
    }
    return {
      messge: "Request New Token is fail"
    };
  }
}
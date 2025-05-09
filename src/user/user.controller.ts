import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AppDto } from 'src/app.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('User')
@ApiBearerAuth()
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({ status: 200, description: 'Returns user loggon' })
  async getUserByEmail(@Request() req) {
    const email = req.user.email;
    const user = await this.userService.findByEmail(email);
    return user ? new AppDto(200, "User found", { id: user._id, email: user.email, username: user.username }) : { message: 'User not found' };
  }
}
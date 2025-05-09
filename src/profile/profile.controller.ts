import { Controller, Post, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiTags('Profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Get('profile')
  @ApiResponse({ status: 200, description: 'Returns user profile' })
  async getProfile(@GetUser() user) {
    const profile = await this.profileService.getProfile(user.userId);
    return {
      code: 200,
      status: true,
      message: "Profile found",
      data: profile
    };
  }

  @Put('profile')
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  async updateProfile(@GetUser() user, @Body() dto: UpdateProfileDto) {
    console.log(dto);
    const profile = await this.profileService.updateProfile(user.userId, dto);
    return {
      code: 200,
      status: true,
      message: "Profile updated successfully",
      data: profile
    };
  }
}
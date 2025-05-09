import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user (minimum 6 characters)',
    example: 'securePassword123',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'Username' })
  @IsString()
  username: string;
}
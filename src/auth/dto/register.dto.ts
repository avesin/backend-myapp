import { IsEmail, IsLowercase, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
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

  @ApiProperty({
    description: 'The username of the user (minimum 3 characters) and lowercase',
    example: 'johndoe',
  })
  @IsNotEmpty()
  @MinLength(3)
  @IsLowercase()
  username: string;
}
import { IsEmail, IsLowercase, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsLowercase()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'user@example.com',
  })
  @IsLowercase()
  @IsOptional()
  username: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'securePassword123',
  })
  @IsNotEmpty()
  password: string;
}
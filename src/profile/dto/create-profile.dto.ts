import { IsString, IsDateString, IsEnum, IsOptional, IsNumber, IsBase64 } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProfileDto {
  @ApiProperty({ description: 'Fullname' })
  @IsOptional()
  @IsString()
  fullname: string;

  @ApiProperty({ description: 'Date of birth (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  birthdate: string;

  @ApiPropertyOptional({ description: 'Gender', enum: ['male', 'female', null] })
  @IsOptional()
  @IsEnum(['male', 'Male', 'female', 'Female', null])
  gender?: 'male' | 'female' | 'Male' | 'Female' | null;

  @ApiProperty({ description: 'Bio', required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ description: 'Base64 Avatar URL', required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ description: 'Weight', required: false })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({ description: 'Height', required: false })
  @IsOptional()
  @IsNumber()
  height?: number;
}
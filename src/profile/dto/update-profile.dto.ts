import { IsOptional, IsString, IsDateString, IsEnum, IsNumber, IsBase64 } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional({ description: 'Username' })
  @IsOptional()
  @IsString()
  fullname?: string;

  @ApiPropertyOptional({ description: 'Date of birth (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  birthdate?: string;

  @ApiPropertyOptional({ description: 'Gender', enum: ['male', 'female', null] })
  @IsOptional()
  @IsEnum(['male', 'Male', 'female', 'Female', null])
  gender?: 'male' | 'female' | 'Male' | 'Female' | null;

  @ApiPropertyOptional({ description: 'Image Base64' })
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

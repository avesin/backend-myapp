import { IsEmail, IsNotEmpty, MinLength, IsLowercase } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UsernameDto {
    @ApiProperty({
        description: 'The username of the user (minimum 3 characters) and lowercase',
        example: 'johndoe',
    })
    @IsNotEmpty()
    @MinLength(3)
    @IsLowercase()
    username: string;
}
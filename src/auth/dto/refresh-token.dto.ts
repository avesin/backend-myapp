import { ApiProperty } from "@nestjs/swagger";
import { IsJWT } from "class-validator";

export class RefreshTokenDto {
    @ApiProperty({
        description: 'refresh token of the user',
        example: 'xxxx',
    })
    @IsJWT()
    refresh_token: string;
}
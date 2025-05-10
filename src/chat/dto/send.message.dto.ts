import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class SendMessageDto {
  @ApiProperty({ example: '663aeabcde1234567890f123', description: 'Receiver user ID (MongoDB ObjectId)' })
  @IsMongoId()
  receiverId: string;

  @ApiProperty({ example: 'Hello! How are you?', description: 'The message content' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { ChatService } from "./chat.service";
import { SendMessageDto } from "./dto/send.message.dto";
import { ApiBearerAuth } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('api')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('sendMessage')
  async sendMessage(@GetUser('userId') sender: string, @Body() dto: SendMessageDto) {
    return this.chatService.sendMessage(sender, dto.receiverId, dto.content);
  }

  @Get('viewMessages/:userId')
  async viewMessages(@GetUser('userId') current: string, @Param('userId') other: string) {
    return this.chatService.getConversation(current, other);
  }
}
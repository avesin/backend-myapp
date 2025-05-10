import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Message, MessageSchema } from "./schemas/message.schema";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { RabbitMQModule } from "src/rabbitmq/rabbitmq.module";
import { JwtStrategy } from "src/auth/jwt.strategy";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    RabbitMQModule, // custom module to publish/consume
  ],
  controllers: [ChatController], // or ChatGateway if using WebSocket
  providers: [ChatService],
})
export class ChatModule {}
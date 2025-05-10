import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Message, MessageDocument } from "./schemas/message.schema";
import { RabbitMQService } from "src/rabbitmq/rabbitmq.service";
import { Model } from "mongoose";

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private msgModel: Model<MessageDocument>,
    private readonly rabbitMQService: RabbitMQService, // publish messages
  ) {}

  async sendMessage(senderId: string, receiverId: string, content: string) {
    const message = await this.msgModel.create({ sender: senderId, receiver: receiverId, content });
    
    // 🔁 Publish to RabbitMQ
    this.rabbitMQService.publish('chat.message', {
      messageId: message._id,
      sender: senderId,
      receiver: receiverId,
      content,
    });

    return message;
  }

  async getConversation(userA: string, userB: string) {
    return this.msgModel.find({
      $or: [
        { sender: userA, receiver: userB },
        { sender: userB, receiver: userA },
      ],
    }).sort({ createdAt: 1 });
  }
}

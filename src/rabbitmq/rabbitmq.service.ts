import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const url = this.configService.get('RABBITMQ_URL') || 'amqp://localhost';
    this.connection = await amqp.connect(url);
    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange('chat', 'topic', { durable: true });
  }

  async publish(routingKey: string, payload: Record<string, any>) {
    const buffer = Buffer.from(JSON.stringify(payload));
    this.channel.publish('chat', routingKey, buffer);
  }

  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
  }
}

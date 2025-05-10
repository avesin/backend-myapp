import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { InterestModule } from './interests/interest.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { ChatModule } from './chat/chat.module';
import * as Joi from 'joi';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
        PORT: Joi.number().default(3000),
        JWT_ACCESS_TTL: Joi.string().default('5m'),
        JWT_REFRESH_TTL: Joi.string().default('30d'),
        APP_ENV: Joi.string().valid('development', 'staging', 'production').default('development'),
        FRONTEND_URL: Joi.string().uri().optional(),
      }),
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<MongooseModuleOptions> => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    ChatModule,
    RabbitMQModule,
    AuthModule,
    UserModule,
    ProfileModule,
    InterestModule
  ],
})
export class AppModule { }
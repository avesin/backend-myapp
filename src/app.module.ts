import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { InterestModule } from './interests/interest.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: getMongoConfig,
    }),
    AuthModule,
    UserModule,
    ProfileModule,
    InterestModule
  ],
})
export class AppModule { }
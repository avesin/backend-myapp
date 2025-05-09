import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Interest, InterestSchema } from '../interests/schemas/interest.schema';  // Needed for userId reference
import { InterestController } from './interest.controller';
import { InterestService } from './interest.service';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Interest.name, schema: InterestSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [InterestController],
  providers: [InterestService],
})

export class InterestModule {}

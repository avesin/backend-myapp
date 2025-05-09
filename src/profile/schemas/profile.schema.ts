import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop()
  fullname: string;

  @Prop()
  birthdate: Date;

  @Prop()
  gender: 'male' | 'female' | 'other';

  @Prop()
  image: string;

  @Prop()
  height: number;

  @Prop()
  weight: number;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

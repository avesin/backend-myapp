import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  // Create a new user
  async createUser(data: { email: string; password: string; username: string }): Promise<UserDocument> {
    const newUser = new this.userModel(data);
    return newUser.save();
  }

  // Find a user by email
  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

   // Find a user by username
  async findUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }

  // Find user by ID
  async findById(userId: string): Promise<UserDocument | null> {
    return this.userModel.findById(userId).exec();
  }

  // Optional: List all users
  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }
}

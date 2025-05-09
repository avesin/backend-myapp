import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

import { calculateZodiac } from '../common/utils/calculate-zodiac';
import { calculateHoroscope } from '../common/utils/calculate-horoscope';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<ProfileDocument>,
  ) { }

  // Create profile
  async createProfile(userId: string, dto: CreateProfileDto): Promise<Profile> {
    // const zodiac = calculateZodiac(dto.dateOfBirth);
    // const horoscope = calculateHoroscope(dto.dateOfBirth);

    const profile = new this.profileModel({
      userId,
      fullname: dto.fullname,
      dateOfBirth: dto.birthdate,
      gender: dto.gender?.toLowerCase(),
      image: dto.image,
      height: dto.height,
      weight: dto.weight
    });

    return profile.save();
  }

  // Get profile by userId
  async getProfile(userId: string): Promise<Profile> {
    const profile = await this.profileModel.findOne({ userId }).exec();
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  // Update profile
  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<Profile> {

    // if (dto.dateOfBirth) {
    //   data.zodiac = calculateZodiac(dto.dateOfBirth);
    //   data.horoscope = calculateHoroscope(dto.dateOfBirth);
    // }

    const data = {
      fullname: dto.fullname,
      birthdate: dto.birthdate,
      gender: dto.gender?.toLowerCase(),
      image: dto.image,
      height: dto.height,
      weight: dto.weight
    };

    var profile = await this.profileModel.findOneAndUpdate(
      { userId },
      data,
      { new: true, upsert: true }
    ).exec();
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }
}
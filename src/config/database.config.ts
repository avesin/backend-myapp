import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = (): MongooseModuleOptions => ({
  uri: process.env.MONGO_URI || 'mongodb://admin:adminpassword@localhost:27017/youappdb?authSource=admin',
});
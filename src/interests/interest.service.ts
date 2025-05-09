import { Injectable, NotFoundException } from "@nestjs/common";
import { Interest, InterestDocument } from "./schemas/interest.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class InterestService {
    constructor(
        @InjectModel(Interest.name) private readonly interestModel: Model<InterestDocument>,
    ) { }


    async updateInterests(userId: string, interests: string[]): Promise<Interest> {
        console.log("updateInterests", interests)
        const data = await this.interestModel.findOneAndUpdate(
            { userId },
            { values: interests },
            { new: true, upsert: true }

        ).exec();

        if (!data) {
            throw new NotFoundException('[1]Interest not found');
        }
        console.log(data);
        return data;
    }


    async getInterests(userId: string): Promise<Interest> {
        console.log("getInterests", userId)
        const data = await this.interestModel.findOne(
            { userId },

        ).exec();
        if (!data) {
            throw new NotFoundException('[1]Interest not found');
        }

        return data;
    }
}
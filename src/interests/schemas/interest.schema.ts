import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type InterestDocument = Interest & Document;


@Schema({ timestamps: true })
export class Interest {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
    userId: Types.ObjectId;

    @Prop({ type: [String], default: [] })
    values: string[]
}

export const InterestSchema = SchemaFactory.createForClass(Interest);
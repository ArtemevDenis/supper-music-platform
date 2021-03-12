import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {Document} from 'mongoose';
import {Track} from "../../track/schemas/track.schema";
import {User} from "../../user/schemas/user.schema";

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    @Prop()
    text: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Track'})
    track: Track;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    author: User;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
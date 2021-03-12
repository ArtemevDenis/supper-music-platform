import {ObjectId} from "mongoose";

export class CreateCommentDto {
    readonly trackId: ObjectId;
    readonly authorId: ObjectId;
    readonly text: string;

}
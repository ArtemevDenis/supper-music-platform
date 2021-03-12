import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type CommentDocument = User & Document;

@Schema()
export class User {
    @Prop()
    text: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
import {Injectable} from "@nestjs/common";
import {Comment, CommentDocument} from "./schemas/comment.schema";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {Track, TrackDocument} from "../track/schemas/track.schema";


@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
                @InjectModel(Track.name) private trackModel: Model<TrackDocument>) {
    }

    async create(dto: CreateCommentDto): Promise<Comment> {
        const track = await this.trackModel.findById(dto.trackId)
        const comment = await this.commentModel.create({...dto})
        track.comments.push(comment._id)
        await track.save();
        return comment;
    }


}
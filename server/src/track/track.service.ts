import {Injectable} from "@nestjs/common";
import {Track, TrackDocument} from "./schemas/track.schema";
import {Comment, CommentDocument} from "../comment/schemas/comment.schema";
import {Model, ObjectId} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {CreateTrackDto} from "./dto/create-track.dto";
import {FileService, FileType} from "../file/file.service";


@Injectable()
export class TrackService {
    constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
                @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
                private fileService: FileService) {
    }

    async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio)
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        return await this.trackModel.create({...dto, listens: 0, audio: audioPath, picture: picturePath});
    }

    async getAll(count: number = 10, offset: number = 0): Promise<Track[]> {
        return this.trackModel.find().skip(offset).limit(count);
    }

    async getOne(id: ObjectId): Promise<Track> {
        return this.trackModel.findById(id).populate('comments');
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const track = await this.trackModel.findByIdAndDelete(id);
        return track._id;
    }

    async listen(id: ObjectId) {
        const track = await this.trackModel.findById(id);
        track.listens += 1;
        await track.save();
    }

    async search(query: string): Promise<Track[]> {
        return this.trackModel.find({name: {$regex: new RegExp(query, 'i')}});
    }
}
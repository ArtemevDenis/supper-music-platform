import {Body, Controller, Post} from "@nestjs/common";
import {CommentService} from "./comment.service";
import {CreateCommentDto} from "./dto/create-comment.dto";

@Controller('/comment')
export class CommentController {
    constructor(private  commentService: CommentService) {
    }

    @Post()
    create(@Body() dto: CreateCommentDto) {
        return this.commentService.create(dto)
    }

}
import {Body, Controller, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Post as PostModel} from "./posts.model";
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";


@ApiTags("Post")
@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {
  }

  @ApiOperation({summary: "Create Post"})
  @ApiResponse({status: 200, type: PostModel})
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
    return this.postsService.createPost(dto, image)
  }
}

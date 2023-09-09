import {ApiProperty} from "@nestjs/swagger";

export class CreatePostDto{
  @ApiProperty({example : "What is HTMX?"})
  readonly title : string;
  @ApiProperty({example : "Lorem ipsum"})
  readonly content : string;
  @ApiProperty({example : "5"})
  readonly userId : number;
}
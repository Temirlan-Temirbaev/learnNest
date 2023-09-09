import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
  @ApiProperty({example : "email@mail.ru", description : "email"})
  @IsString({message : "email must be a string"})
  @IsEmail({}, {message : "email must be a valid email"})
  readonly email: string;
  @ApiProperty({example : "<PASSWORD>", description : "password"})
  @IsString({message : "password must be a string"})
  @Length(4, 16, {message : "password must be between 4 and 16 characters"})
  readonly password: string;
}
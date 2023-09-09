import {ApiProperty} from "@nestjs/swagger";

export class BanUserDto {
  @ApiProperty({example : "5"})
  readonly userId : number;
  @ApiProperty({example : "Nazi speech"})
  readonly banReason : string;
}
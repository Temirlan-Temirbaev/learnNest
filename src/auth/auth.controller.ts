import {Body, Controller, Post} from "@nestjs/common";
import {User} from "../users/users.model";
import {AuthService} from "./auth.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiOperation({summary: "Login"})
  @ApiResponse({status: 200, type: User})
  @Post("/login")
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({summary: "Registration"})
  @ApiResponse({status: 200, type: User})
  @Post("/register")
  register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }
}

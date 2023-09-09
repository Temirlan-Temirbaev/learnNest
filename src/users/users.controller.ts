import {Body, Controller, Get, Post, UseGuards, UsePipes} from "@nestjs/common";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles-guard";
import {ValidationPipe} from "../pipes/validation.pipe";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";

@ApiTags("User")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }


  @ApiOperation({summary: "Create a new user"})
  @ApiResponse({status: 200, type: User})
  @UsePipes(ValidationPipe)
  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @ApiOperation({summary: "Get all users"})
  @ApiResponse({status: 200, type: [User]})
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({summary: "Add Role"})
  @ApiResponse({status: 200})
  @Post('/role')
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  addRole(@Body() dto : AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({summary: "Add Role"})
  @ApiResponse({status: 200})
  @Post("/ban")
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  ban(@Body() dto : BanUserDto) {
    return this.usersService.ban(dto);
  }

}

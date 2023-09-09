import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Role} from "./roles.model";
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";


@ApiTags("Role")
@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {
  }

  @ApiOperation({summary: "Create Role"})
  @ApiResponse({status: 200, type: Role})
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @ApiOperation({summary: "Get Role by Value"})
  @ApiResponse({status: 200, type: Role})
  @Get("/:value")
  getByValue(@Param("value") value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}

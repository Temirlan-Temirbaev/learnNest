import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {Role} from "../roles/roles.model";
import {RolesService} from "../roles/roles.service";

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private readonly usersRepository: typeof User,
              private rolesService : RolesService) {}

  async createUser(dto : CreateUserDto){
    const user = await this.usersRepository.create(dto);
    const role = await this.rolesService.getRoleByValue("USER");
    await user.$set("roles", [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers(){
    return await this.usersRepository.findAll({include : {all : true}});
  }

  async getUserByEmail(email : string){
    return await this.usersRepository.findOne({where : {email}, include : {all : true}})
  }

  async addRole(dto : AddRoleDto){
    const user = await this.usersRepository.findByPk(dto.userId);
    const role = await this.rolesService.getRoleByValue(dto.value);

    if (role && user) {
      await user.$add("roles", role.id);
      return dto;
    }

    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  async ban(dto : BanUserDto){
    const user = await this.usersRepository.findByPk(dto.userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }
}

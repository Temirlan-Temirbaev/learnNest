import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs"
import {User} from "../users/users.model";

@Injectable()
export class AuthService {

  constructor(private readonly usersService: UsersService,
              private jwtService: JwtService) {
  }

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto)
    return this.generateToken(user)
  }

  async register(dto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.usersService.createUser({...dto, password: hashPassword})
    return this.generateToken(user)
  }

  async generateToken(user: User) {
    const payload = {username: user.email, id: user.id, roles: user.roles};
    return {
      token: this.jwtService.sign(payload),
    }
  }

  async validateUser(dto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(dto.email);
    if (!candidate) {
      throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
    }
    const isMatch = await bcrypt.compare(dto.password, candidate.password);
    if (!isMatch) {
      throw new HttpException("Invalid credentials", HttpStatus.BAD_REQUEST);
    }
    return candidate;
  }
}

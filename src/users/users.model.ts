import {Column, DataType, Model, Table, BelongsToMany, HasMany} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Post} from "../posts/posts.model";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";

interface IUserAttributes {
  email: string;
  password: string;
}


@Table({tableName: "users"})
export class User extends Model<User, IUserAttributes> {
  @ApiProperty({example: "1", description: "unique id"})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: "test@mail.ru", description: "unique email address"})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @ApiProperty({example: "test12345"})
  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @Column({type: DataType.BOOLEAN, defaultValue: false})
  banned: boolean;

  @Column({type: DataType.STRING, allowNull: true})
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[]

  @HasMany(() => Post)
  posts : Post[]

}
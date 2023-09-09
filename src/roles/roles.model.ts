import {Column, DataType, Model, Table, BelongsToMany} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {UserRoles} from "./user-roles.model";

interface RoleCreationAttributes {
  value: string;
  description: string;
}

@Table({tableName: "roles"})
export class Role extends Model<Role, RoleCreationAttributes> {
  @ApiProperty({example: "1", description: "unique id"})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  @ApiProperty({example: "admin", description: "role name"})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  value: string;
  @ApiProperty({example: "admin", description: "role description"})
  @Column({type: DataType.STRING, allowNull: false})
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
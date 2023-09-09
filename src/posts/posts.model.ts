import {Column, DataType, Model, Table, BelongsTo, ForeignKey} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";

interface IPostAttributes {
  title: string;
  content: string;
  userId: number;
  image: string;
}


@Table({tableName: "posts", createdAt: false, updatedAt: false})
export class Post extends Model<Post, IPostAttributes> {
  @ApiProperty({example: "1", description: "unique id"})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: "How to learn VueJS?"})
  @Column({type: DataType.STRING, unique: false, allowNull: false})
  title: string;

  @ApiProperty({example: "Some content"})
  @Column({type: DataType.STRING, allowNull: false})
  content: string;

  @ApiProperty({example: "fds3lfjslk3.jpg", description: "name and extension of image"})
  @Column({type: DataType.STRING})
  image: string;

  @ApiProperty({example: "1", description: "Author ID"})
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;

  @BelongsTo(() => User)
  author: User

}
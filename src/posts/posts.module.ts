import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {FilesModule} from "../files/files.module";
import {User} from "../users/users.model";
import {Post} from "./posts.model";
import {PostsService} from "./posts.service";
import {PostsController} from "./posts.controller";

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    SequelizeModule.forFeature([User, Post]),
    FilesModule,
  ],
})
export class PostsModule {
}

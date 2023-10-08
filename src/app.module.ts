import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";
import {Post} from "./posts/posts.model";
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import {RolesModule} from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { FilesModule } from './files/files.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ServeStaticModule.forRoot({
      rootPath : path.resolve(__dirname, 'static')
    }),
    ConfigModule.forRoot({envFilePath: '.env'}),
    SequelizeModule.forRoot({
      uri : process.env.POSTGRES_URI,
      dialect: "postgres",
      // host: process.env.POSTGRES_HOST,
      // port: Number(process.env.POSTGRES_PORT),
      // username: process.env.POSTGRES_USERNAME,
      // password: process.env.POSTGRES_PASSWORD,
      // database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Post],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ]
})
export class AppModule {

}
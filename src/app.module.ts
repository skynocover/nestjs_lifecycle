import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './features/todo/todo.module';
import { UtilsModule } from './features/utils/utils.module';

// 自定義動態moduel管理config 讀取development.env
import { ConfigurationModule } from './common/configuration/configuration.module';

// 官方config管理工具 讀取.env
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './database/user/user.service';
import { PostService } from './database/post/post.service';
// 用一些不同環境下不會變動的資料當設定檔
import configurationFactory from './config/configuration.factory';

// 引入prisma相關controller
import { UserController } from './features/user/user.controller';

@Module({
  imports: [
    TodoModule,
    UtilsModule,
    ConfigurationModule.forRoot({
      path: `../${process.env.NODE_ENV || 'development'}.env`,
    }),
    ConfigModule.forRoot({
      // 取得第一個存在的檔案當設定檔
      envFilePath: ['development.local.env', 'development.env'],
      isGlobal: true,
      load: [configurationFactory],
      expandVariables: true, // 開啟環境變數檔變數嵌入功能
    }),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, PrismaService, UserService, PostService],
})
export class AppModule {}

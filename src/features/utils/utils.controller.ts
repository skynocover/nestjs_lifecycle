import {
  Controller,
  Get,
  Param,
  HttpStatus,
  HttpException,
  UseFilters,
  ParseBoolPipe,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

// 使用filter
import { HttpExceptionFilter } from '../../filters/http-exception.filter';

// 使用其他的moduel的service
import { TodoService } from '../todo/todo.service';

// 使用Interceptor
import { HelloWorldInterceptor } from '../../interceptors/hello-world.interceptor';

// 使用Guard
import { AuthGuard } from '../../guards/auth.guard';

// 使用decorator
import { User } from '../../decorators/user.decorator';
// 使用decorator 驗證角色
import { Roles } from '../../decorators/roles.decorator';
import { RoleGuard } from '../../guards/role.guard';
// 使用整合裝飾器
import { Auth } from 'src/decorators/auth.decorator';

// 使用動態moduel做出config
import { ConfigurationService } from '../../common/configuration/configuration.service';

// 官方config
import { ConfigService } from '@nestjs/config';

@ApiTags('utils')
@Controller('utils')
export class UtilsController {
  // 用外部service這裡必須實體化
  constructor(
    private readonly todoService: TodoService,
    private readonly configService: ConfigurationService,
    private readonly configDefault: ConfigService,
  ) {}

  // pipe檢查, 錯誤Exception回傳
  @Get('/error/:check')
  //使用pipe來驗證格式
  getError(@Param('check', ParseBoolPipe) check: boolean) {
    if (check) {
      // nest 提供的標準exception
      throw new HttpException('出錯囉!', HttpStatus.BAD_REQUEST);
      // 自定義回傳錯誤格式
      //  throw new HttpException(
      //    {
      //      code: HttpStatus.BAD_REQUEST,
      //      msg: '出錯囉!'
      //    },
      //      HttpStatus.BAD_REQUEST
      //  );
    }
    return 'un exception';
  }

  // 使用自定義錯誤Filter並更換格式
  @Get('/customError')
  @UseFilters(HttpExceptionFilter)
  //使用pipe來驗證格式
  getCustomError() {
    // nest 提供的標準exception
    throw new HttpException('出錯囉!', HttpStatus.BAD_REQUEST);
  }

  // 使用外部module
  @Get('/todos')
  // 使用 Interceptor, 也可以直接放在controller上
  @UseInterceptors(HelloWorldInterceptor)
  getTodos() {
    return this.todoService.getTodos();
  }

  // 使用Guard做驗證
  @Get('/guard')
  @UseGuards(AuthGuard)
  guard() {
    return;
  }

  // 使用Decorator
  @Get('/decorator')
  user(@User() user: any): string {
    return user;
  }

  // 驗證Role
  @Get('/role')
  @Roles('staff') // 這裡加上要驗證的角色
  @UseGuards(RoleGuard) // 這裡驗證角色
  role(@User('name') name: string): string {
    return name;
  }
  // 使用整合裝飾器, 將Roles以及UseGuards整合在一起
  @Get('/role/apply')
  @Auth('staff')
  getApply(@User('name') name: string) {
    return name;
  }

  // 使用動態module做出config
  @Get('/config')
  getConfig() {
    return { username: this.configService.get('USERNAME') };
  }

  // 官方config管理工具
  @Get('/defaultConfig')
  getDefaultConfig() {
    const username = this.configDefault.get('USERNAME');
    const database = this.configDefault.get('database');
    const app_domain = this.configDefault.get('APP_DOMAIN');
    const redirect_url = this.configDefault.get('APP_REDIRECT_URL');
    return { username, database, app_domain, redirect_url };
  }
}

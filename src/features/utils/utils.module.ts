import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UtilsController } from './utils.controller';
import { UtilsService } from './utils.service';

// 使用其他module
import { TodoModule } from '../todo/todo.module';

// 使用middleware
import { LoggerMiddleware } from '../../middlewares/logger.middleware';
import { RoleMiddleware } from '../../middlewares/role.middleware';

@Module({
  controllers: [UtilsController],
  providers: [UtilsService],
  imports: [TodoModule],
})
export class UtilsModule {
  // 這裡要將middleware引入進來
  configure(consumer: MiddlewareConsumer) {
    // 兩種指定方式
    consumer.apply(LoggerMiddleware).forRoutes('/utils/todos');
    consumer.apply(LoggerMiddleware).forRoutes(
      { path: '/todos', method: RequestMethod.POST }, // POST /todos 會生效
      { path: '/', method: RequestMethod.GET }, // GET / 會生效
    );
    // 排除指定route
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: '/todos', method: RequestMethod.PATCH }, // 排除 GET /todos
        { path: '/utils/role', method: RequestMethod.GET },
      )
      .forRoutes(UtilsController);
    // 作用於整個Controller
    // consumer.apply(LoggerMiddleware).forRoutes(UtilsController);

    // 配合裝飾器
    consumer
      .apply(RoleMiddleware)
      .forRoutes('/utils/role', '/utils/role/apply');
  }
}

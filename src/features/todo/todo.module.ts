import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

// @Global() // 讓其他module不需要使用import也能用 盡量不要使用
@Module({
  controllers: [TodoController],
  providers: [TodoService],
  // 做export的動作才能讓其他module使用
  exports: [TodoService],
})
export class TodoModule {}

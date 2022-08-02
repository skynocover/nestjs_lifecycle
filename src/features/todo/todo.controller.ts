import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  Param,
  Query,
  HttpCode,
  Header,
} from '@nestjs/common';

// 讓swagger更容易找到
import { ApiBody, ApiHeader, ApiTags, ApiResponse } from '@nestjs/swagger';

// 引用dto
import { CreateTodoDto } from './dto/create-todo.dto';

// 引入Service
import { TodoService } from './todo.service';

@ApiTags('Todo') // 顯示在swagger用
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // Query
  @Get()
  getAll(@Query('limit') limit: number, @Query('skip') skip = 0) {
    return { data: this.todoService.getTodos(), limit, skip };
  }

  // Param
  @Get(':id')
  getOne(@Param('id') id: string) {
    console.log('AAA');
    return this.todoService.getTodo(id);
  }

  // Post body
  @Post()
  // 設定body格式
  postOne(
    @Body('title') title: string,
    @Body('description') theDescription?: string, // 在這裡重新命名參數
  ) {
    return { title, theDescription };
  }

  // Header StatusCode
  @Post('/noContent')
  // status code
  @HttpCode(HttpStatus.NO_CONTENT)
  // 在 Swagger UI 上可以看到狀態 201 的描述
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The todo has been successfully created.',
  })
  // 回傳header
  @Header('X-Hao-headers', '1')
  // 在 Swagger UI 上可以看到 X-Custom 的欄位可以填寫
  @ApiHeader({
    name: 'X-Custom',
    description: 'Try to set custom header.',
  })
  noContent() {
    return;
  }

  // DTO Validate Pipe
  @Post('/dto')
  @ApiBody({ type: CreateTodoDto })
  @UsePipes(ValidationPipe) //使用class-validator驗證格式,可以直接放在controller下宣告
  // whitelist: 將無效參數過濾掉
  // forbidNonWhitelisted: 如果有無效參數就直接回傳錯誤
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() dto: CreateTodoDto) {
    const id = 1;
    return { id, ...dto };
  }
}

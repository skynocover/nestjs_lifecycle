// 驗證器
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
// 讓swagger可以讀取
import { ApiProperty } from '@nestjs/swagger';

export enum TodoPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export class CreateTodoDto {
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  // 顯示在swagger, 可不使用
  @ApiProperty({
    maxLength: 20,
    description: '標題',
  })
  public readonly title: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public readonly description?: string;

  @ApiProperty({
    // 要加上這個swagger才有辦法讀取陣列
    type: [String],
    description: '賦予該 Todo 標籤',
  })
  tags: string[];

  @ApiProperty({
    // enum 也需要特殊標記
    enum: TodoPriority,
    enumName: 'TodoPriority', // 取名稱讓 Swagger 將其建立成 Schema
    description: '設置該 Todo 的優先權',
  })
  priority: TodoPriority;
}

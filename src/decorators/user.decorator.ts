import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// export const User = (...args: string[]) => SetMetadata('user', args);

// 參數裝飾器
// 需要配合middleware才能使用
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

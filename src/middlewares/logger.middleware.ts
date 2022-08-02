import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    console.log(req.originalUrl);
    // 這裡是為了配合 decorator
    req.user = { name: 'HAO' };
    next();
  }
}

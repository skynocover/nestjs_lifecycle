import { CanActivate, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

// 整合裝飾器用
@Injectable()
export class ApplyGuard implements CanActivate {
  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}

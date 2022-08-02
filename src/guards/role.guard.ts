import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 取得裝飾器內指定要驗證的role
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(roles, user);
    return this.matchRoles(roles, user.roles);
  }

  private matchRoles(resources: string[], target: string[]): boolean {
    return !!resources.find((x) => target.find((y) => y === x));
  }
}

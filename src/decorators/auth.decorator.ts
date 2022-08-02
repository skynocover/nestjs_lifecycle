import { applyDecorators, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../guards/role.guard';
import { ApplyGuard } from '../guards/apply.guard';
import { Roles } from './roles.decorator';

// 整合裝飾器
export const Auth = (...roles: string[]) =>
  applyDecorators(Roles(...roles), UseGuards(ApplyGuard, RoleGuard));

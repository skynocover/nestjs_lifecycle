import { SetMetadata } from '@nestjs/common';

// Metada裝飾器
// 在Role的guard內抓出來驗證
// 在這裏將指定的role塞入metadata以便讓guard可以抓到
export const Roles = (...args: string[]) => SetMetadata('roles', args);

import { SetMetadata } from '@nestjs/common';
export const ROLES = 'role';
export const Roles = (...roles: string[]) => SetMetadata(ROLES, roles);

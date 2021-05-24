import { registerEnumType } from '@nestjs/graphql';

export enum AppRoles {
  ALL = 'ALL',
  ADMIN = 'ADMIN',
  USER = 'USER',
  OWNER = 'OWNER',
}

registerEnumType(AppRoles, {
  name: 'AppRoles',
});

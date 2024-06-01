import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class UsersOwnershipGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const user = request.user
    const entityId = request.params.userId

    if (user.id !== entityId) return false
    return true
  }
}
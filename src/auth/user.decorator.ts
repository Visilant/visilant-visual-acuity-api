import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '@auth/jwt/jwt-payload';

export const User = createParamDecorator((data: keyof JwtPayload, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user as JwtPayload;

  return data ? user?.[data] : user;
});

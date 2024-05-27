import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard implements CanActivate {
	canActivate(context: ExecutionContext) {
		const response = context.switchToHttp().getResponse();
		return response.locals.user;
	}
}

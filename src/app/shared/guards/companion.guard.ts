import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const response = context.switchToHttp().getResponse();
		return response.locals.user.role === 'companion';
	}
}

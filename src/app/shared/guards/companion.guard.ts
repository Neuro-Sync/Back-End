import { CanActivate, ExecutionContext } from '@nestjs/common';

export class CompanionGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const response = context.switchToHttp().getResponse();
		console.log(response.locals.user);
		return response.locals.user.role === 'companion';
	}
}

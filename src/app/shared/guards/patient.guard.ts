import { CanActivate, ExecutionContext } from '@nestjs/common';

export class PatientGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const response = context.switchToHttp().getResponse();
		return response.locals.user.role === 'patient';
	}
}

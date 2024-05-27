import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AccessGuard extends AuthGuard('Strategy_JWT_AT') {
	constructor(private reflector: Reflector) {
		super();
	}

	canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.getAllAndOverride('isPublic', [
			context.getHandler(),
			context.getClass(),
		]);

		if (isPublic) return true;

		return super.canActivate(context);
	}

	handleRequest(err, user, info) {
		if (err || !user) {
			if (err.message === 'jwt expired') {
				throw new Error('Token expired');
			}
			if (err.message === 'invalid signature') {
				throw new Error('Invalid token');
			}
			throw err || new Error('Unauthorized');
		}
		return user;
	}
}

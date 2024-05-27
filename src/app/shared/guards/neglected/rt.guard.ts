import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class RefreshGuard extends AuthGuard('Strategy_JWT_RT') {
	constructor() {
		super();
	}

	handleRequest(err, user, info) {
		if (err || !user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}

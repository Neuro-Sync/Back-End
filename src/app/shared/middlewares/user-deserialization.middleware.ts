import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';
import { TokenService } from './../token/token.service';

@Injectable()
export class UserDeserializationMiddleware implements NestMiddleware {
	private logger = new Logger(UserDeserializationMiddleware.name);
	constructor(private readonly tokenService: TokenService) {
		this.logger.debug('User Deserialization Middleware Initialized');
	}

	async use(req: Request, res: Response, next: NextFunction): Promise<void> {
		this.logger.debug('User Deserialization Middleware Running');
		const accessToken = _.get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
		const refreshToken = _.get(req, 'headers.x-refresh', '');

		this.logger.debug(`Access Token: ${accessToken}`);

		if (!accessToken || accessToken == '') return next();
		const { decoded, expired } = await this.tokenService.verifyJWT(accessToken, 'access');

		if (decoded) {
			// FIXME we stop this while we are developing for better testing experience
			// FIXME Here we need to compare decoded object with database document for password change or account suspension or verification
			// if (decoded.role == 'user') {
			// 	if (!decoded.isVerified || decoded.isSuspended) return next();
			// }
			this.logger.debug(`User ${decoded.id} is verified and not suspended`);

			res.locals.user = decoded;
			return next();
		}

		if (expired && refreshToken !== '') {
			const newAccessToken = await this.tokenService.issueAccessToken(refreshToken);
			if (newAccessToken) {
				res.setHeader('x-access-token', newAccessToken);
				res.setHeader('Access-Control-Expose-Headers', 'x-access-token');
			} else return next();

			const { decoded } = await this.tokenService.verifyJWT(newAccessToken, 'access');

			this.logger.debug(`User ${decoded.id} is verified and not suspended`);
			res.locals.user = decoded;
			return next();
		}

		return next();
	}
}

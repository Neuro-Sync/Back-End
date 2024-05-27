import { AuthSessionService } from '@modules/authentication/auth-session/auth-session.service';
import { PatientService } from '@modules/patients/patient/patient.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as crypto from 'crypto';
import * as _ from 'lodash';
import { Model } from 'mongoose';
import { TokenTypes } from './enums';
import { Token, TokenDocument } from './schemas/token.schema';

@Injectable()
export class TokenService {
	constructor(
		@InjectModel(Token.name) private TokenModel: Model<Token>,
		private readonly jwtService: JwtService,
		private readonly patientService: PatientService,
		private readonly authSessionService: AuthSessionService,
	) {}

	async createToken(userId: string, tokenTypes: TokenTypes): Promise<TokenDocument> {
		const resetToken = crypto.randomBytes(32).toString('hex');
		const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

		const token = new this.TokenModel({
			user: userId,
			type: tokenTypes,
			token: hashedToken,
			expiresAt: new Date(Date.now() + parseInt(process.env.JWT_PASSWORD_RESET_EXPIRES_IN) * 60000),
		});
		return await token.save();
	}

	// FIXME we still new to fix any here so it can handle boolean or user
	async verifyToken(hashedToken: string, tokenTypes: TokenTypes): Promise<any> {
		const storedToken = await this.TokenModel.findOneAndDelete({
			type: tokenTypes,
			token: hashedToken,
			expiresAt: { $gt: new Date(Date.now()) },
		});
		if (!storedToken) return false;

		return storedToken.user;
	}

	//FIXME we still new to fix any here
	async signJWT(jwtPayload: any, tokenType: 'access' | 'refresh') {
		let secret: string;
		let options: any = {};

		if (tokenType === 'access') {
			secret = process.env.JWT_ACCESS_SECRET;
			options = { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN };
		}

		if (tokenType === 'refresh') {
			secret = process.env.JWT_REFRESH_SECRET;
			options = { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN };
		}

		return this.jwtService.signAsync(jwtPayload, { secret, ...options });
	}

	async verifyJWT(token: string, tokenType: 'access' | 'refresh') {
		try {
			let publicKey: string;

			if (tokenType === 'access') {
				publicKey = process.env.JWT_ACCESS_PUBLIC;
			}
			if (tokenType === 'refresh') {
				publicKey = process.env.JWT_REFRESH_PUBLIC;
			}

			const decoded = this.jwtService.verify(token, { publicKey });
			return { valid: true, expired: false, decoded };
		} catch (e) {
			if (e.name === 'TokenExpiredError') {
				return { valid: false, expired: true, decoded: null };
			} else {
				return { valid: false, expired: false, decoded: null };
			}
		}
	}

	async issueAccessToken(refreshToken) {
		const { decoded } = await this.verifyJWT(refreshToken, 'refresh');
		if (!decoded || !_.get(decoded, 'session')) return false;

		const session = await this.authSessionService.findSessionById(_.get(decoded, 'session'));
		if (!session || session.status == 'inactive' || session.status == 'expired') return false;

		const [patient] = await this.patientService.findPatients({ id: session.user });
		if (!patient) return false;

		const accessToken = this.signJWT(
			{
				...patient.toJSON(),
				session: session._id,
			},
			'access',
		);

		return accessToken;
	}
}

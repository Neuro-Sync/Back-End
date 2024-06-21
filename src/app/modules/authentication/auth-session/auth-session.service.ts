import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AuthSession, AuthSessionDocument } from './schemas/auth-session.schema';

@Injectable()
export class AuthSessionService {
  constructor(@InjectModel(AuthSession.name) private AuthSessionModel: Model<AuthSession>) {}

  async createSession(session: Partial<AuthSessionDocument>): Promise<AuthSessionDocument> {
    const createdSession = new this.AuthSessionModel(session);
    return createdSession.save();
  }

  async findSessionById(id: string): Promise<AuthSessionDocument | null> {
    return this.AuthSessionModel.findOne({
      _id: id,
      status: {
        $in: ['active', 'valid']
      }
    });
  }

  async deleteSessionById(id: string): Promise<AuthSessionDocument> {
    return this.AuthSessionModel.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });
  }
}

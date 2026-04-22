import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  ConversationSession,
  SessionDocument,
} from '../session/entities/session.entity';
import {
  ConversationEvent,
  EventDocument,
} from '../event/event.schema';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class SessionService {
  constructor(
    @InjectModel(ConversationSession.name)
    private sessionModel: Model<SessionDocument>,

    @InjectModel(ConversationEvent.name)
    private eventModel: Model<EventDocument>,
    private configService: ConfigService,

  ) {}

  async createOrGetSession(dto: any) {
    try {
      return await this.sessionModel.findOneAndUpdate(
        { sessionId: dto.sessionId },
        {
          $setOnInsert: {
            ...dto,
            startedAt: new Date(),
          },
        },
        { upsert: true,  returnDocument: 'after'  },
      );
    } catch (err) {
      if (err.code === 11000) {
        return this.sessionModel.findOne({ sessionId: dto.sessionId });
      }
      throw err;
    }
  }

  async addEvent(sessionId: string, dto: any) {
    const session = await this.sessionModel.findOne({ sessionId });
  
    if (!session) {
      throw new NotFoundException('Session not found');
    }
  
    try {
      return await this.eventModel.create({
        ...dto,
        sessionId,
        timestamp: new Date(),
      });
    } catch (err) {
      if (err.code === 11000) {
        return this.eventModel.findOne({
          sessionId,
          eventId: dto.eventId,
        });
      }
  
      throw err;
    }
  }

  async getSession(
    sessionId: string,
    { page = 1, limit = 10 },
  ) {
    const skip = (page - 1) * limit;
  
    const session = await this.sessionModel.findOne({ sessionId });
  
    if (!session) {
      throw new NotFoundException('Session not found');
    }
  
    const [events, total] = await Promise.all([
      this.eventModel
        .find({ sessionId })
        .sort({ timestamp: 1 }) 
        .skip(skip)
        .limit(limit),
  
      this.eventModel.countDocuments({ sessionId }),
    ]);
  
    return {
      session,
      events,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  
  async completeSession(sessionId: string) {
    const session = await this.sessionModel.findOne({ sessionId });
  
    if (!session) {
      throw new NotFoundException('Session not found');
    }
  
    if (session.status === 'completed') {
      return session;
    }
  
    return this.sessionModel.findOneAndUpdate(
      { sessionId },
      {
        status: 'completed',
        endedAt: new Date(),
      },
      { returnDocument: 'after' }
    );
  }
}
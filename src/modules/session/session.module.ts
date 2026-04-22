import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ConversationSession,
  SessionSchema,
} from '../session/entities/session.entity';

import {
  ConversationEvent,
  EventSchema,
} from '../event/event.schema';

import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: ConversationSession.name, schema: SessionSchema },
      { name: ConversationEvent.name, schema: EventSchema },
    ]),
  ],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
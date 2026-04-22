import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SessionDocument = ConversationSession & Document;

@Schema({ timestamps: true })
export class ConversationSession {
  @Prop({ unique: true,index:true })
  sessionId: string;

  @Prop({ enum: ['initiated', 'active', 'completed', 'failed'] })
  status: string;

  @Prop()
  language: string;

  @Prop()
  startedAt: Date;

  @Prop({ default: null })
  endedAt: Date;

  @Prop({ type: Object })
  metadata: Record<string, any>;
}

export const SessionSchema = SchemaFactory.createForClass(ConversationSession);

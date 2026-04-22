import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = ConversationEvent & Document;

@Schema()
export class ConversationEvent {
  @Prop({ required: true, index: true })
  sessionId: string;

  @Prop({ required: true }) 
  eventId: string;

  @Prop({ enum: ['user_speech', 'bot_speech', 'system'], required: true })
  type: string;

  @Prop({ type: Object, required: true })
  payload: Record<string, any>;

  @Prop({ required: true, index: true })
  timestamp: Date;
}

export const EventSchema = SchemaFactory.createForClass(ConversationEvent);

EventSchema.index({ sessionId: 1, eventId: 1 }, { unique: true });

EventSchema.index({ sessionId: 1, timestamp: 1 });
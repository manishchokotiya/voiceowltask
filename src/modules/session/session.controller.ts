import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
} from '@nestjs/common';

import { SessionService } from './session.service';
import { CreateSessionDto, PaginationDto } from './dto/create-session.dto';
import { AddEventDto } from './dto/create-session.dto';

import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('sessions')
@Controller('sessions')
export class SessionController {
  constructor(private readonly service: SessionService) {}

  @Post()
  @ApiOperation({ summary: 'Create or get session' })
  createSession(@Body() dto: CreateSessionDto) {
    return this.service.createOrGetSession(dto);
  }

  @Post(':sessionId/events')
  @ApiOperation({ summary: 'Add event to session' })
  addEvent(
    @Param('sessionId') sessionId: string,
    @Body() dto: AddEventDto,
  ) {
    return this.service.addEvent(sessionId, dto);
  }

@Get(':sessionId')
getSession(
  @Param('sessionId') sessionId: string,
  @Query() query: PaginationDto,
) {
  return this.service.getSession(sessionId, query);
}

  @Post(':sessionId/complete')
  @ApiOperation({ summary: 'Complete session' })
  complete(@Param('sessionId') sessionId: string) {
    return this.service.completeSession(sessionId);
  }
}
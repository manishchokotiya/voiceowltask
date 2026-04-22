import { IsString, IsOptional, IsObject, IsEnum, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class CreateSessionDto {
  @ApiProperty({ example: 'abc123' })
  @IsString()
  sessionId: string;

  @ApiProperty({ example: 'initiated' })
  @IsEnum(['initiated', 'active', 'completed', 'failed'])
  @IsString()
  status: string;

  @ApiProperty({ example: 'en' })
  @IsString()
  language: string;

  @ApiPropertyOptional({ example: { source: 'mobile' } })
  @IsOptional()
  metadata?: Record<string, any>;
}


export class AddEventDto {
  @ApiProperty({ example: 'event1' })
  @IsString()
  eventId: string;

  @ApiProperty({ example: 'user_speech' })
  @IsString()
  type: string;

  @ApiProperty({
    example: {
      text: 'Hello',
    },
  })
  @IsObject()
  payload: Record<string, any>;
}

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Page number (starts from 1)',
    example: 1,
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of records per page',
    example: 10,
    minimum: 1,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
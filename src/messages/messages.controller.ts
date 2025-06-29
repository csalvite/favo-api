import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // POST /messages - Send a new message
  @Post()
  @ApiOperation({ summary: 'Send a new message' })
  @ApiResponse({ status: 201, description: 'Message sent successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  // GET /messages/:taskId - Retrieve all messages for a specific task
  @Get(':taskId')
  @ApiOperation({ summary: 'Retrieve all messages for a specific task' })
  @ApiParam({ name: 'taskId', description: 'ID of the task', type: String })
  @ApiResponse({ status: 200, description: 'List of messages for the task.' })
  @ApiResponse({
    status: 404,
    description: 'Task not found or no messages available.',
  })
  findAll(@Param('taskId') taskId: string) {
    return this.messagesService.findAll(taskId);
  }
}

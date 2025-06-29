import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // GET /notifications/:userId - Retrieve all notifications for a user
  @Get(':userId')
  @ApiOperation({ summary: 'Retrieve all notifications for a user' })
  @ApiParam({ name: 'userId', description: 'ID of the user', type: String })
  @ApiResponse({
    status: 200,
    description: 'List of notifications for the user.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found or no notifications.',
  })
  findOne(@Param('userId') userId: string) {
    return this.notificationsService.findOne(userId);
  }

  // PATCH /notifications/:id/read - Update a notification to mark it as read
  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark a notification as read' })
  @ApiParam({ name: 'id', description: 'ID of the notification', type: String })
  @ApiResponse({ status: 200, description: 'Notification marked as read.' })
  @ApiResponse({ status: 404, description: 'Notification not found.' })
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }
}

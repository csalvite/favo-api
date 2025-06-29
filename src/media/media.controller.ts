import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  // POST /media/upload - Upload a new media file (images, videos, etc.)
  @Post('upload')
  @ApiOperation({ summary: 'Upload a new media file (images, videos, etc.)' })
  @ApiResponse({ status: 201, description: 'Media uploaded successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.create(createMediaDto);
  }

  // DELETE /media/:id - Delete a media file by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a media file by ID' })
  @ApiParam({ name: 'id', description: 'ID of the media file', type: String })
  @ApiResponse({ status: 200, description: 'Media deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Media file not found.' })
  remove(@Param('id') id: string) {
    return this.mediaService.remove(+id);
  }
}

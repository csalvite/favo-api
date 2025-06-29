import { Controller, Get } from '@nestjs/common';
import { StatusService } from './status.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  // GET /status - Retrieve all status entries
  @Get()
  @ApiOperation({ summary: 'Retrieve all status entries' })
  @ApiResponse({ status: 200, description: 'List of all task status entries.' })
  findAll() {
    return this.statusService.findAll();
  }
}

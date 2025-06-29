import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Assignments')
@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  // POST /assignments - Create a new assignment task-user
  @Post()
  @ApiOperation({
    summary: 'Create a new assignment between a task and a user',
  })
  @ApiResponse({ status: 201, description: 'Assignment created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentsService.create(createAssignmentDto);
  }

  // GET /assignments/:taskId - Retrieve assignment for a specific task
  @Get(':taskId')
  @ApiOperation({ summary: 'Retrieve assignment for a specific task' })
  @ApiParam({ name: 'taskId', description: 'ID of the task', type: String })
  @ApiResponse({ status: 200, description: 'Assignment details for the task.' })
  @ApiResponse({ status: 404, description: 'Task or assignment not found.' })
  findAll(@Param('taskId') taskId: string) {
    return this.assignmentsService.findAll(taskId);
  }

  // DELETE /assignments/:id - Delete an assignment
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an assignment' })
  @ApiParam({ name: 'id', description: 'ID of the assignment', type: String })
  @ApiResponse({ status: 200, description: 'Assignment deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Assignment not found.' })
  remove(@Param('id') id: string) {
    return this.assignmentsService.remove(+id);
  }
}

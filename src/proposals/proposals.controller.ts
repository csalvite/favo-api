import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { CreateProposalDto } from './dto/create-proposal.dto';
import { UpdateProposalDto } from './dto/update-proposal.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Proposals')
@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) {}

  // POST /proposals - Send a new proposal for a task
  @Post()
  @ApiOperation({ summary: 'Send a new proposal for a task' })
  @ApiResponse({ status: 201, description: 'Proposal created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createProposalDto: CreateProposalDto) {
    return this.proposalsService.create(createProposalDto);
  }

  // GET /proposals/:taskId - Retrieve all proposals for a specific task
  @Get(':taskId')
  @ApiOperation({ summary: 'Retrieve all proposals for a specific task' })
  @ApiParam({ name: 'taskId', description: 'ID of the task', type: String })
  @ApiResponse({ status: 200, description: 'List of proposals for the task.' })
  @ApiResponse({ status: 404, description: 'Task not found or no proposals.' })
  findOne(@Param('taskId') taskId: string) {
    return this.proposalsService.findOne(taskId);
  }

  // PATCH /proposals/:id - Update a proposal status (accept or reject)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a proposal status (accept or reject)' })
  @ApiParam({ name: 'id', description: 'ID of the proposal', type: String })
  @ApiResponse({ status: 200, description: 'Proposal updated successfully.' })
  @ApiResponse({ status: 404, description: 'Proposal not found.' })
  update(
    @Param('id') id: string,
    @Body() updateProposalDto: UpdateProposalDto,
  ) {
    return this.proposalsService.update(+id, updateProposalDto);
  }

  // DELETE /proposals/:id - Delete a proposal
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a proposal' })
  @ApiParam({ name: 'id', description: 'ID of the proposal', type: String })
  @ApiResponse({ status: 200, description: 'Proposal deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Proposal not found.' })
  remove(@Param('id') id: string) {
    return this.proposalsService.remove(+id);
  }
}

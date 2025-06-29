import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserAddressesService } from './user-addresses.service';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('UserAddresses')
@Controller('user-addresses')
export class UserAddressesController {
  constructor(private readonly userAddressesService: UserAddressesService) {}

  // POST /user-addresses - Create a new user address
  @Post()
  @ApiOperation({ summary: 'Create a new user address' })
  @ApiResponse({
    status: 201,
    description: 'User address created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createUserAddressDto: CreateUserAddressDto) {
    return this.userAddressesService.create(createUserAddressDto);
  }

  // GET /user-addresses/:userId - Get all user addresses
  @Get(':userId')
  @ApiOperation({ summary: 'Get user address by user ID' })
  @ApiParam({ name: 'userId', description: 'ID of the user', type: String })
  @ApiResponse({ status: 200, description: 'User address found.' })
  @ApiResponse({ status: 404, description: 'User address not found.' })
  findOne(@Param('userId') userId: string) {
    return this.userAddressesService.findOne(+userId);
  }

  // PATCH /user-addresses/:id - Update a user address
  @Patch(':id')
  @ApiOperation({ summary: 'Update a user address' })
  @ApiParam({ name: 'id', description: 'ID of the address', type: String })
  @ApiResponse({
    status: 200,
    description: 'User address updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'User address not found.' })
  update(
    @Param('id') id: string,
    @Body() updateUserAddressDto: UpdateUserAddressDto,
  ) {
    return this.userAddressesService.update(+id, updateUserAddressDto);
  }

  // DELETE /user-addresses/:id - Delete a user address
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user address' })
  @ApiParam({ name: 'id', description: 'ID of the address', type: String })
  @ApiResponse({
    status: 200,
    description: 'User address deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'User address not found.' })
  remove(@Param('id') id: string) {
    return this.userAddressesService.remove(+id);
  }
}

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseService } from 'src/common/responses/response.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class StatusService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly responseService: ResponseService,
  ) {}

  async findAll() {
    try {
      const status = await this.prisma.status.findMany();

      if (!status || status.length === 0) {
        throw new NotFoundException('Statuses not found.');
      }

      return this.responseService.success(
        'Statuses retrieved successfully',
        status,
      );
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Statuses not found.');
        }
      }
      throw new InternalServerErrorException('Unexpected error.');
    }
  }
}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ResponseModule } from 'src/common/responses/response.module';

@Module({
  imports: [PrismaModule, ResponseModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

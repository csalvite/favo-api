import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ResponseModule } from 'src/common/responses/response.module';

@Module({
  imports: [PrismaModule, ResponseModule],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}

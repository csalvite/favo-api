import { Module } from '@nestjs/common';
import { UserAddressesService } from './user-addresses.service';
import { UserAddressesController } from './user-addresses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ResponseModule } from 'src/common/responses/response.module';

@Module({
  imports: [PrismaModule, ResponseModule],
  controllers: [UserAddressesController],
  providers: [UserAddressesService],
})
export class UserAddressesModule {}

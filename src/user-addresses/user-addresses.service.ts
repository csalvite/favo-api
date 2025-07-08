import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseService } from 'src/common/responses/response.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { validateAddressPayload } from 'src/utils/addresses.util';

@Injectable()
export class UserAddressesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly responseService: ResponseService,
  ) {}

  async create(createUserAddressDto: CreateUserAddressDto) {
    try {
      validateAddressPayload(createUserAddressDto);

      const userExists = await this.prisma.user.findUnique({
        where: { id: createUserAddressDto.user_id },
      });

      if (!userExists) {
        throw new BadRequestException('User does not exist.');
      }

      const newAddress = await this.prisma.userAddress.create({
        data: {
          user_id: createUserAddressDto.user_id,
          street: createUserAddressDto.street,
          postal_code: createUserAddressDto.postal_code,
          city: createUserAddressDto.city,
          province: createUserAddressDto.province,
          country: createUserAddressDto.country,
          lat: createUserAddressDto.lat,
          lon: createUserAddressDto.lon,
          created_at: new Date(),
        },
      });

      return this.responseService.success(
        'Address created successfully',
        newAddress,
      );
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Email already exists.');
        }
      }

      throw new InternalServerErrorException('Unexpected error.');
    }
  }

  findAll() {
    return `This action returns all userAddresses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAddress`;
  }

  update(id: number, updateUserAddressDto: UpdateUserAddressDto) {
    return `This action updates a #${id} userAddress`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAddress`;
  }
}

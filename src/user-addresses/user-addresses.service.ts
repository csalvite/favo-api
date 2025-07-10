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

  async findUserAddresses(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: id },
      });

      if (!user) {
        throw new NotFoundException('User not found.');
      }

      if (!user.active) {
        throw new BadRequestException('User is already inactive.');
      }

      const userAddresses = await this.prisma.userAddress.findMany({
        where: { user_id: id },
      });

      return this.responseService.success(
        'User addresses returned succesfully',
        userAddresses,
      );
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('User not found.');
        }
      }
      throw new InternalServerErrorException('Unexpected error.');
    }
  }

  async update(id: string, updateUserAddressDto: UpdateUserAddressDto) {
    try {
      // Check if user exists
      const address = await this.prisma.userAddress.findUnique({
        where: { id: id },
      });

      if (!address) {
        throw new NotFoundException('Address not found.');
      }

      // Prepare update object
      const updateData: any = {};

      if (updateUserAddressDto.street) {
        updateData.street = updateUserAddressDto.street.trim();
      }

      if (updateUserAddressDto.city) {
        updateData.city = updateUserAddressDto.city.trim();
      }

      if (updateUserAddressDto.country) {
        updateData.country = updateUserAddressDto.country.trim();
      }

      if (updateUserAddressDto.province) {
        updateData.province = updateUserAddressDto.province.trim();
      }

      if (updateUserAddressDto.postal_code) {
        updateData.postal_code = updateUserAddressDto.postal_code.trim();
      }

      if (updateUserAddressDto.lat || updateUserAddressDto.lon) {
        updateData.lat = updateUserAddressDto.lat;
        updateData.lon = updateUserAddressDto.lon;
      }

      if (Object.keys(updateData).length === 0) {
        throw new BadRequestException('No data provided for update.');
      }

      const updatedUserAddress = await this.prisma.userAddress.update({
        where: { id: id },
        data: updateData,
      });

      return this.responseService.success(
        'User address updated successfully',
        updatedUserAddress,
      );
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Address not found.');
        }
      }
      throw new InternalServerErrorException('Unexpected error.');
    }
  }

  async remove(id: string) {
    try {
      const address = await this.prisma.userAddress.findUnique({
        where: { id: id },
      });

      if (!address) {
        throw new NotFoundException('Address not found.');
      }

      const deletedAddress = await this.prisma.userAddress.delete({
        where: { id: id },
      });

      return this.responseService.success(
        'Address deleted succesfully',
        deletedAddress,
      );
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Address not found.');
        }
      }
      throw new InternalServerErrorException('Unexpected error.');
    }
  }
}

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseService } from 'src/common/responses/response.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { hashPassword } from 'src/utils/crypto.util';
import { mapDtoToDb } from 'src/utils/users.util';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly responseService: ResponseService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      // Transform DTO to DB object ready to insert
      const userToSave = await mapDtoToDb(createUserDto);

      const newUser = await this.prisma.user.create({ data: userToSave });

      return this.responseService.success('User created successfully', newUser);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // Unique constraint failed
          throw new BadRequestException('Email already exists.');
        }
      }
      throw new InternalServerErrorException('Unexpected error.');
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: id },
      });

      return this.responseService.success('Returned user succesfully', user);
    } catch (error) {
      throw new NotFoundException('User not found.');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      // Check if user exists
      const user = await this.prisma.user.findUnique({
        where: { id: id },
      });

      if (!user) {
        throw new NotFoundException('User not found.');
      }

      // Prepare update object
      const updateData: any = {};

      if (updateUserDto.name) {
        updateData.name = updateUserDto.name.trim();
      }

      if (updateUserDto.email) {
        updateData.email = updateUserDto.email.toLowerCase().trim();
      }

      if (updateUserDto.password) {
        updateData.password_hash = await hashPassword(updateUserDto.password);
      }

      if (updateUserDto.phone) {
        updateData.phone = updateUserDto.phone;
      }

      if (updateUserDto.bio) {
        updateData.bio = updateUserDto.bio.trim();
      }

      if (Object.keys(updateData).length === 0) {
        throw new BadRequestException('No data provided for update.');
      }

      const updatedUser = await this.prisma.user.update({
        where: { id: id },
        data: updateData,
      });

      const { password_hash, ...safeUser } = updatedUser;

      return this.responseService.success(
        'User updated successfully',
        safeUser,
      );
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Email already exists.');
        }
        if (error.code === 'P2025') {
          throw new NotFoundException('User not found.');
        }
      }
      console.error(error);
      throw new InternalServerErrorException('Unexpected error.');
    }
  }

  async remove(id: string) {
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

      const deletedUser = await this.prisma.user.update({
        where: { id: id },
        data: { active: false },
      });

      return this.responseService.success(
        'User deleted succesfully',
        deletedUser,
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

  login({ email, password }: { email: string; password: string }) {
    return `This action login user`;
  }

  googleLogin({ token: string }) {
    return `This action auth an user with Google OAuth`;
  }
}

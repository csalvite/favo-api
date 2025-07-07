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

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly responseService: ResponseService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      // Transform DTO to DB object ready to insert
      const userToSave = await this.mapDtoToDb(createUserDto);

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

  private async mapDtoToDb(dto: CreateUserDto) {
    return {
      name: dto.name.trim(),
      email: dto.email.toLowerCase().trim(),
      password_hash: await this.hashPassword(dto.password),
      phone: dto.phone,
      bio: dto.bio?.trim() ?? null,
      role: 'user',
      is_verified: false,
      created_at: new Date(),
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  login({ email, password }: { email: string; password: string }) {
    return `This action login user`;
  }

  googleLogin({ token: string }) {
    return `This action auth an user with Google OAuth`;
  }
}

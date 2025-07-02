import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '+34633000000' })
  @IsPhoneNumber(null) // puedes especificar 'ES' si quieres restringirlo a España
  phone: string;

  @ApiProperty({ example: 'A passionate developer.', required: false })
  @IsOptional()
  @IsString()
  bio?: string;
}

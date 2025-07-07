import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  IsPhoneNumber,
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Jane Doe' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'janedoe@gmail.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'newpassword123' })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({ example: '+34633123456' })
  @IsOptional()
  @IsPhoneNumber(null)
  phone?: string;

  @ApiPropertyOptional({ example: 'Updated bio.' })
  @IsOptional()
  @IsString()
  bio?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, IsNumber } from 'class-validator';

export class CreateUserAddressDto {
  @ApiProperty({ example: '9c3d5c48-82c1-4f26-b9c5-9a90a9a933ed' })
  @IsUUID()
  user_id: string;

  @ApiProperty({ example: 'Calle Mayor, 24, 2ºB' })
  @IsString()
  street: string;

  @ApiProperty({ example: '15001' })
  @IsString()
  postal_code: string;

  @ApiProperty({ example: 'A Coruña' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'A Coruña' })
  @IsString()
  province: string;

  @ApiProperty({ example: 'España' })
  @IsString()
  country: string;

  @ApiProperty({ example: 43.3623, required: false })
  @IsOptional()
  @IsNumber()
  lat?: number;

  @ApiProperty({ example: -8.4115, required: false })
  @IsOptional()
  @IsNumber()
  lon?: number;
}

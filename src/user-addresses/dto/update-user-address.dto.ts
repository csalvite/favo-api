import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, IsNumber } from 'class-validator';

export class UpdateUserAddressDto {
  @ApiProperty({ example: 'Calle Mayor, 24, 2ºB' })
  @IsOptional()
  @IsString()
  street?: string;

  @ApiProperty({ example: '15001' })
  @IsOptional()
  @IsString()
  postal_code?: string;

  @ApiProperty({ example: 'A Coruña' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ example: 'A Coruña' })
  @IsOptional()
  @IsString()
  province?: string;

  @ApiProperty({ example: 'España' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ example: 43.3623, required: false })
  @IsOptional()
  @IsNumber()
  lat?: number;

  @ApiProperty({ example: -8.4115, required: false })
  @IsOptional()
  @IsNumber()
  lon?: number;
}

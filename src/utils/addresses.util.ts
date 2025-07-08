import { BadRequestException } from '@nestjs/common';
import { CreateUserAddressDto } from 'src/user-addresses/dto/create-user-address.dto';

export function validateAddressPayload(payload: CreateUserAddressDto) {
  const errors: string[] = [];

  if (!payload.street || !payload.street.trim()) {
    errors.push('Street is required.');
  }

  if (!payload.postal_code || payload.postal_code.trim().length < 3) {
    errors.push('Postal code is required and must be at least 3 characters.');
  }

  if (!payload.city || !payload.city.trim()) {
    errors.push('City is required.');
  }

  if (!payload.province || !payload.province.trim()) {
    errors.push('Province is required.');
  }

  if (!payload.country || !payload.country.trim()) {
    errors.push('Country is required.');
  }

  if (payload.lat !== undefined) {
    if (payload.lat < -90 || payload.lat > 90) {
      errors.push('Latitude must be between -90 and 90.');
    }
  }

  if (payload.lon !== undefined) {
    if (payload.lon < -180 || payload.lon > 180) {
      errors.push('Longitude must be between -180 and 180.');
    }
  }

  if (errors.length > 0) {
    throw new BadRequestException(errors.join(' '));
  }
}

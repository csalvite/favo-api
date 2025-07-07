import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { hashPassword } from './crypto.util';

export async function mapDtoToDb(dto: CreateUserDto) {
  return {
    name: dto.name.trim(),
    email: dto.email.toLowerCase().trim(),
    password_hash: await hashPassword(dto.password),
    phone: dto.phone,
    bio: dto.bio?.trim() ?? null,
    role: 'user',
    is_verified: false,
    created_at: new Date(),
  };
}

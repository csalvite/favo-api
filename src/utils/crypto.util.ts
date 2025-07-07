import * as bcrypt from 'bcrypt';

/**
 * Hashea una contraseña de forma segura.
 * @param password Texto plano
 * @returns Hash de la contraseña
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

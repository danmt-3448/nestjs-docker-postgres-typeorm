import * as bcrypt from 'bcrypt';
import { envConfig } from 'src/constants/config';

export async function hash(password: string): Promise<string> {
  return bcrypt.hashSync(password, Number(envConfig.saltPassword));
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compareSync(password, hash);
}

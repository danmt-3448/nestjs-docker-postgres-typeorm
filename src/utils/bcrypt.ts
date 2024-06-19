import * as bcrypt from 'bcrypt';
import { envConfig } from 'src/constants/config';

export async function hash(data: string): Promise<string> {
  return bcrypt.hashSync(data, Number(envConfig.saltPassword));
}

export async function compare(data: string, hash: string): Promise<boolean> {
  return bcrypt.compareSync(data, hash);
}

import { StatusUser } from 'src/utils/enums/users';

export type User = {
  id: string;
  username: string;
  fullName: string;
  phone?: string;
  status?: StatusUser;
  age: string;
};

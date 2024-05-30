import { StatusUser } from 'src/enums/users';

export class CreateUserDto {
  username: string;
  fullName: string;
  phone?: string;
  status?: StatusUser;
}

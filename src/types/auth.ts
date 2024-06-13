import { UserVerifyStatus } from 'src/utils/enums';

export interface TokenPayload {
  user_id: string;
  verify: UserVerifyStatus;
}

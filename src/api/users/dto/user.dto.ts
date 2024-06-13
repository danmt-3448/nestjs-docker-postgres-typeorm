import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { UserVerifyStatus } from 'src/utils/enums';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  @Length(0, 20)
  phone?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(10)
  age: number;

  @IsOptional()
  @IsEnum(UserVerifyStatus)
  status?: UserVerifyStatus;
}

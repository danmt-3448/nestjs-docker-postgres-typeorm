import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  Length,
  IsNumber,
  Min,
} from 'class-validator';
import { StatusUser } from 'src/utils/enums/users';

export class CreateUserDto {
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
  //validate min age
  age: number;

  @IsOptional()
  @IsEnum(StatusUser)
  status?: StatusUser;
}

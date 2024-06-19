import {
  IsOptional,
  IsString,
  MaxLength,
  Min,
  Validate,
} from 'class-validator';
import { AddressEntity } from 'src/database/entities/address.entity';
import { IsPhoneValidator } from 'src/validators/is-phone-validator';

export class UpdateUserDto {
  @IsString()
  @MaxLength(50)
  @IsOptional()
  fullName: string;

  //   @IsPhoneNumber()
  @Validate(IsPhoneValidator)
  @IsOptional()
  phone: string;

  @IsString()
  @Min(0)
  @IsOptional()
  age: string;

  @IsString()
  @IsOptional()
  address: AddressEntity[];
}

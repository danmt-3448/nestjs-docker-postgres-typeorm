import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { AddressType } from 'src/utils/enums';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 255)
  address: string;

  @IsNotEmpty()
  @IsEnum(AddressType)
  type: AddressType;
}

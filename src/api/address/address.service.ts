import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from 'src/database/entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressEntity: Repository<AddressEntity>,
  ) {}
  async create(createAddressDto: CreateAddressDto): Promise<AddressEntity> {
    try {
      const user = this.addressEntity.create(createAddressDto);
      const save = await this.addressEntity.save(user);
      return save;
    } catch (error) {
      if (error.code === '23505') {
        // PostgreSQL unique violation error code
        throw new HttpException(
          'Address already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw error;
    }
  }

  async findAll() {
    return `This action returns all address`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    console.log(updateAddressDto);

    return `This action updates a #${id} address`;
  }

  async remove(id: number) {
    return `This action removes a #${id} address`;
  }
}

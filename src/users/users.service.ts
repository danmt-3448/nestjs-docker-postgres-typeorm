import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/utils/types/users';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const user = this.userRepository.create({
        ...createUserDto,
        age: createUserDto.age?.toString(),
      });
      const save = await this.userRepository.save(user);
      return save;
    } catch (error) {
      if (error.code === '23505') {
        // PostgreSQL unique violation error code
        throw new HttpException(
          'Username already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw error;
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOneFromDb(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOne(id: string) {
    const user: User = await this.findOneFromDb(id);
    return { ...user, age: Number(user.age) };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOneFromDb(id);
    if (!user) throw new HttpException('user not found!', HttpStatus.NOT_FOUND);
    await this.userRepository.update(id, {
      ...updateUserDto,
      age: updateUserDto.age.toString(),
    });
    return await this.findOneFromDb(id);
  }

  async remove(id: string) {
    const user = await this.findOneFromDb(id);
    if (!user) throw new HttpException('user not found!', HttpStatus.NOT_FOUND);
    await this.userRepository.remove(user);
    return { message: 'Remove success' };
  }
}

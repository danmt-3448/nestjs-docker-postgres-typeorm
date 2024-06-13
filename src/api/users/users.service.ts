import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { BaseService } from '../base/base.service';

@Injectable()
export class UsersService extends BaseService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    protected readonly entityManager: EntityManager,
  ) {
    super(entityManager);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOneFromDb(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOne(id: string) {
    const user = await this.findOneFromDb(id);
    return { ...user, age: Number(user.age) };
  }

  async findByEmail(email: string) {
    const user: UserEntity = await this.entityManager.findOneBy(UserEntity, {
      email,
    });
    if (!user) {
      throw new HttpException('Email is not exist!', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async update(id: string, userDto: UserDto) {
    const user = await this.findOneFromDb(id);
    if (!user) throw new HttpException('user not found!', HttpStatus.NOT_FOUND);
    await this.userRepository.update(id, {
      ...userDto,
      age: userDto.age.toString(),
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

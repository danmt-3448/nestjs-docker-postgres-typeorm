import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { UserFindOneCondition } from 'src/types/auth';
import { EntityManager, Repository } from 'typeorm';
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

  async findOneByCondition(condition: UserFindOneCondition) {
    const user: UserEntity = await this.entityManager.findOneBy(
      UserEntity,
      condition,
    );
    if (!user) {
      throw new HttpException(
        condition.email ? 'Email is not exist!' : 'User not found!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
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

  async remove(id: string) {
    const user = await this.findOneByCondition({ id });
    await this.userRepository.remove(user);

    return { message: 'Remove success' };
  }
}

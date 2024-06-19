import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { UserFindOneCondition } from 'src/types/auth';
import { EntityManager, Repository } from 'typeorm';
import { BaseService } from '../base/base.service';
import { UpdateUserDto } from './dto/update.dto';
import { RequestWithUser } from 'src/types/requests.type';

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

  async update(@Req() req: RequestWithUser, body: UpdateUserDto) {
    await this.entityManager.save(UserEntity, { ...req.user, ...body });
    const newUserData = { ...req.user, ...body };

    return { message: 'Update user success', data: newUserData };
  }

  async remove(id: string) {
    const user = await this.findOneByCondition({ id });
    await this.userRepository.remove(user);

    return { message: 'Remove success' };
  }
}

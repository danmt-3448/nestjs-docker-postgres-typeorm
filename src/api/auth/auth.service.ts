import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { EntityManager } from 'typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { compare, hash } from 'src/utils/bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { BaseService } from '../base/base.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { envConfig } from 'src/constants/config';
import { TokenPayload } from 'src/types/auth';

@Injectable()
export class AuthService extends BaseService {
  constructor(
    protected readonly entityManager: EntityManager,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    super(entityManager);
  }

  generateAccessToken(payload: TokenPayload) {
    return this.jwtService.sign(payload, {
      secret: envConfig.jwtSecretAccessToken,
      expiresIn: envConfig.jwtAccessTokenExpiresIn,
    });
  }

  generateRefreshToken(payload: TokenPayload) {
    return this.jwtService.sign(payload, {
      secret: envConfig.jwtSecretRefreshToken,
      expiresIn: envConfig.jwtRefreshTokenExpiresIn,
    });
  }

  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;
    const isUserExist = await this.entityManager.existsBy(UserEntity, {
      email,
    });
    if (isUserExist) {
      throw new HttpException('Email is exist!', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await hash(password);
    const userData = this.entityManager.create(UserEntity, {
      ...signUpDto,
      password: hashPassword,
    });
    await this.entityManager.save(UserEntity, userData);

    return {
      message: 'Sign up success!',
    };
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.userService.findOneByCondition({ email });
    const checkPassword = compare(password, user.password);
    if (!checkPassword) {
      throw new HttpException(
        'Email or password is wrong!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const tokenPayload: TokenPayload = {
      user_id: user.id,
      verify: user.verify,
    };
    const access_token = this.generateAccessToken(tokenPayload);
    const refresh_token = this.generateRefreshToken(tokenPayload);
    await this.entityManager.save(UserEntity, {
      ...user,
      refresh_token,
    });

    return {
      message: 'Sign in success!',
      data: {
        access_token,
        refresh_token,
      },
    };
  }

  async getAuthenticatedUser(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    try {
      const user = await this.userService.findOneByCondition({ email });
      const checkPassword = await compare(password, user.password);
      if (!checkPassword) {
        throw new HttpException(
          'Email or password is wrong!',
          HttpStatus.BAD_REQUEST,
        );
      }

      return user;
    } catch (error) {
      throw new HttpException(
        'Email or password is wrong!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUserIfRefreshTokenMatched(
    user_id: string,
    refresh_token: string,
  ): Promise<UserEntity> {
    try {
      const user = await this.userService.findOneByCondition({ id: user_id });
      if (!user) {
        throw new UnauthorizedException();
      }
      const isMatchRefreshToken = await compare(
        refresh_token,
        await user.refresh_token,
      );
      if (!isMatchRefreshToken) {
        throw new HttpException(
          'Refresh token is invalid!',
          HttpStatus.BAD_REQUEST,
        );
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(user_id) {
    const user = await this.userService.findOneByCondition({ id: user_id });
    if (!user) {
      throw new UnauthorizedException();
    }
    const access_token = this.generateAccessToken({
      user_id,
      verify: user.verify,
    });

    return {
      message: 'Sign in success!',
      data: {
        access_token,
      },
    };
  }
}

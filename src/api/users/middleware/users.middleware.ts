import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('users middleware');
    const { authorization } = req.headers;
    if (!authorization) {
      throw new HttpException(
        'Authorization is required',
        HttpStatus.UNAUTHORIZED,
      );
    } else if (authorization !== 'Bearer danmt auth') {
      throw new HttpException(
        'Invalid authorization token',
        HttpStatus.UNAUTHORIZED,
      );
    }

    next();
  }
}

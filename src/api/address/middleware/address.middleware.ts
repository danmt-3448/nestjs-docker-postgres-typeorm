import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class AddressMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Address middleware');
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

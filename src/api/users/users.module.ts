import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { BaseService } from '../base/base.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, BaseService],
})
export class UsersModule {}
// export class UsersModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(UsersMiddleware)
//       .forRoutes(
//         { path: 'users', method: RequestMethod.POST },
//         { path: 'users/:id', method: RequestMethod.PATCH },
//         { path: 'users/:id', method: RequestMethod.DELETE },
//       );
//   }
// }

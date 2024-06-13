import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AddressMiddleware } from './middleware/address.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from 'src/database/entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AddressMiddleware).forRoutes('address');
  }
}

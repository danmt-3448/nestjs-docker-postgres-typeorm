import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CitiesModule } from './api/cities/cities.module';
import { UsersModule } from './api/users/users.module';
import { AddressModule } from './api/address/address.module';
import { AuthModule } from './api/auth/auth.module';
import { envConfig } from './constants/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envConfig.host,
      port: Number(envConfig.port) || 5432,
      username: envConfig.dbUsername,
      password: envConfig.dbPassword,
      database: envConfig.dbName,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CitiesModule,
    UsersModule,
    AddressModule,
    AuthModule,
  ],
})
export class AppModule {}

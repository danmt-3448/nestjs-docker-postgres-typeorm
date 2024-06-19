import {
  Controller,
  Delete,
  Get,
  Param,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/decorators/auths.decorator';
import { JwtAccessTokenGuard } from '../auth/guards/jwt-access-token.guard';
import { UsersService } from './users.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/utils/enums';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('users')
// guard check all method in controller
// @UseGuards(UserGuard)
@UseGuards(JwtAccessTokenGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @SerializeOptions({
    excludePrefixes: ['first', 'last'],
  })
  @Get()
  @Public()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneByCondition({ id });
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAccessTokenGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

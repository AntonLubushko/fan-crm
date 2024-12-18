import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../user/user.model';

import { AdminUserController } from './admin.user.controller';
import { AdminUserService } from './admin.user.service';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [AdminUserController],
  providers: [AdminUserService, UserRepository],
  exports: [],
})
export class AdminUserModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../user/user.model';

import { AdminUserController } from './admin.user.controller';
import { AdminUserService } from './admin.user.service';
import { AdminUserRepository } from './admin.user.repository';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [AdminUserController],
  providers: [AdminUserService, AdminUserRepository],
  exports: [],
})
export class AdminUserModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/user.model';

import { AdminUserController } from './user/admin.user.controller';
import { AdminUserService } from './user/admin.user.service';
import { UserRepository } from 'src/user/user.repository';
import { AdminItemService } from './item/admin.item.service';
import { AdminItemController } from './item/admin.item.controller';
import { ItemRepository } from '../item/item.repository';
import { Item } from 'src/item/item.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Item])],
  controllers: [AdminUserController, AdminItemController],
  providers: [
    UserRepository,
    ItemRepository,
    AdminUserService,
    AdminItemService,
  ],
  exports: [],
})
export class AdminModule {}

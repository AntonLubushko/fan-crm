import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserShoppingController } from './user.shopping.controller';
import { ShoppingListRepository } from 'src/shopping-list/shopping-list.repository';
import { ShoppingList } from 'src/shopping-list/shopping-list.model';
import { ShoppingListItemsRepository } from 'src/shopping-list-item/shopping-list-item.repository';
import { ShoppingListItem } from 'src/shopping-list-item/shopping-list-item.model';

@Module({
  imports: [SequelizeModule.forFeature([User, ShoppingList, ShoppingListItem])],
  controllers: [UserShoppingController],
  providers: [
    UserService,
    UserRepository,
    ShoppingListRepository,
    ShoppingListItemsRepository,
  ],
  exports: [UserService],
})
export class UserModule {}

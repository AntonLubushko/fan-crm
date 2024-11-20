import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserService } from './user.service';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './user.repository';
import { UserShoppingController } from './controllers/user.shopping.controller';
import { ShoppingListRepository } from 'src/shopping-list/shopping-list.repository';
import { ShoppingList } from 'src/shopping-list/shopping-list.model';

@Module({
  imports: [SequelizeModule.forFeature([User, ShoppingList])],
  controllers: [UserController, UserShoppingController],
  providers: [UserService, UserRepository, ShoppingListRepository],
  exports: [UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShoppingList } from './shopping-list.model';
import { ShoppingListRepository } from './shopping-list.repository';

@Module({
  imports: [SequelizeModule.forFeature([ShoppingList])],
  controllers: [],
  providers: [ShoppingListRepository],
  exports: [ShoppingListRepository],
})
export class ShoppingListModule {}

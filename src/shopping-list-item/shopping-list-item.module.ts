import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShoppingListItem } from './shopping-list-item.model';
import { ShoppingListItemsRepository } from './shopping-list-item.repository';

@Module({
  imports: [SequelizeModule.forFeature([ShoppingListItem])],
  controllers: [],
  providers: [ShoppingListItemsRepository],
  exports: [ShoppingListItemsRepository],
})
export class ShoppingListItemModule {}

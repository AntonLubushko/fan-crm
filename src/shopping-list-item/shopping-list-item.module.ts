import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShoppingListItem } from './shopping-list-item.model';

@Module({
  imports: [SequelizeModule.forFeature([ShoppingListItem])],
  controllers: [],
  providers: [],
  exports: [],
})
export class ShoppingListItemModule {}

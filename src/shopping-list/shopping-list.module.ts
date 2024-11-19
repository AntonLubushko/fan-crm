import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShoppingList } from './shopping-list.model';

@Module({
  imports: [SequelizeModule.forFeature([ShoppingList])],
  controllers: [],
  providers: [],
  exports: [],
})
export class ShoppingListModule {}

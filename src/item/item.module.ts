import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Item } from './item.model';
import { ItemRepository } from './item.repository';

@Module({
  imports: [SequelizeModule.forFeature([Item])],
  providers: [ItemRepository],
  exports: [ItemRepository],
})
export class ItemModule {}

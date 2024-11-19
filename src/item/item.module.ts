import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Item } from './item.model';

@Module({
  imports: [SequelizeModule.forFeature([Item])],
  controllers: [],
  providers: [],
  exports: [],
})
export class ItemModule {}

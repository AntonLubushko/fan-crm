import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { ShoppingListItemModule } from './shopping-list-item/shopping-list-item.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'testdb',
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    UserModule,
    ShoppingListModule,
    ShoppingListItemModule,
    ItemModule,
  ],
})
export class AppModule {}

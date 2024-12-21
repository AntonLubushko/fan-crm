import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { ShoppingListItemModule } from './shopping-list-item/shopping-list-item.module';
import { ItemModule } from './item/item.module';
import { AdminModule } from './admin/admin.module';
import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize';
dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: process.env.DB_TYPE as Dialect,
      host: String(process.env.DB_HOST),
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    AdminModule,
    UserModule,
    ShoppingListModule,
    ShoppingListItemModule,
    ItemModule,
  ],
})
export class AppModule {}

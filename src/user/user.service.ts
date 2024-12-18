import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserPickedUpItemDto } from './dtos/user.pickedup.item.dto';
import * as jwt from 'jsonwebtoken';
import { ShoppingListItem } from 'src/shopping-list-item/shopping-list-item.model';
import { ShoppingListRepository } from 'src/shopping-list/shopping-list.repository';
import { ShoppingListItemsRepository } from 'src/shopping-list-item/shopping-list-item.repository';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { ShoppingListEntity } from 'src/shopping-list/shopping-list.entity';
import { ShoppingListItemEntity } from 'src/shopping-list-item/shopping-list-item.entity';
import { Options } from 'libs/types/db.list.params';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly shoppingListRepository: ShoppingListRepository,
    private readonly shoppingListItemsRepository: ShoppingListItemsRepository,
  ) {}

  async getUserLists(token: string): Promise<ShoppingListEntity[]> {
    const user: UserEntity = await this.verifyAndGetUser(token);

    const userShoppingLists =
      await this.shoppingListRepository.getShoppingLists(null, user.id);
    return userShoppingLists;
  }

  async getUserPickedUpItems(token: string): Promise<ShoppingListItemEntity[]> {
    const user: UserEntity = await this.verifyAndGetUser(token);

    const userPickedUpItems =
      await this.shoppingListItemsRepository.getShoppingListItems(user.id);
    return userPickedUpItems;
  }

  async pickUpItem(
    token: string,
    dto: UserPickedUpItemDto[],
  ): Promise<ShoppingListEntity> {
    const user: UserEntity = await this.verifyAndGetUser(token);

    const shoppingList: ShoppingListEntity =
      await this.shoppingListRepository.createShoppingList(user.id);

    for (let i = 0; i < dto.length; i++) {
      await ShoppingListItem.create({
        shoppingListId: shoppingList.id,
        itemId: dto[i].itemId,
        quantity: dto[i].quantity,
      });
    }

    return this.shoppingListRepository.getShoppingList(
      shoppingList.id,
      user.id,
    );
  }

  async deleteList(token: string, listId: number): Promise<ShoppingListEntity> {
    const user: UserEntity = await this.verifyAndGetUser(token);

    const shoppingList = await this.shoppingListRepository.getShoppingList(
      listId,
      user.id,
    );

    if (!shoppingList) {
      throw new NotFoundException(
        'Shopping list not found or does not belong to user.',
      );
    }

    const deletedCount =
      await this.shoppingListRepository.removeShoppingList(listId);
    if (deletedCount === 0) {
      throw new InternalServerErrorException(
        'Failed to delete the shopping list.',
      );
    }

    return shoppingList;
  }

  private async verifyAndGetUser(token: string): Promise<UserEntity> {
    try {
      const userId = (jwt.decode(token.split(' ')[1]) as any).user;
      const userEntity = await this.userRepository.getUserById(userId);
      if (!userEntity) {
        throw new UnauthorizedException('User not found');
      }

      return userEntity;
    } catch (error) {
      throw error;
    }
  }
}

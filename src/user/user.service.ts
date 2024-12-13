import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.model';
import { UserPickedUpItemDto } from './dtos/user.pickedup.item.dto';
import * as jwt from 'jsonwebtoken';
import { ShoppingListItem } from 'src/shopping-list-item/shopping-list-item.model';
import { ShoppingListRepository } from 'src/shopping-list/shopping-list.repository';
import { ShoppingListItemsRepository } from 'src/shopping-list-item/shopping-list-item.repository';

@Injectable()
export class UserService {
  private listCount = 0;
  constructor(
    private readonly shoppingListRepository: ShoppingListRepository,
    private readonly shoppingListItemsRepository: ShoppingListItemsRepository,
  ) {}

  async getUserLists(token: string) {
    const user = await this.verifyAndGetUser(token);

    const userShoppingLists =
      await this.shoppingListRepository.getShoppingLists(null, user.id);
    return userShoppingLists;
  }

  async getUserPickedUpItems(token: string) {
    const user = await this.verifyAndGetUser(token);

    const userPickedUpItems =
      await this.shoppingListItemsRepository.getShoppingListItems(user.id);
    return userPickedUpItems;
  }

  async pickUpItem(token: string, dto: UserPickedUpItemDto[]): Promise<any> {
    const user = await this.verifyAndGetUser(token);

    const shoppingList = await this.shoppingListRepository.createShoppingList(
      user.id,
    );

    for (let i = 0; i < dto.length; i++) {
      await ShoppingListItem.create({
        shoppingListId: shoppingList.id,
        itemId: dto[i].itemId,
        quantity: dto[i].quantity,
      });
    }

    return this.shoppingListRepository.getShoppingList(shoppingList.id, null, {
      model: ShoppingListItem,
    });
  }

  async deleteList(token: string, listId: number) {
    const user = await this.verifyAndGetUser(token);

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

  private async verifyAndGetUser(token: string): Promise<User> {
    try {
      const userId = (jwt.decode(token.split(' ')[1]) as any).user;
      const user = await User.findByPk(userId);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}

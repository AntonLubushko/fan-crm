import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto } from './dtos/create.user.dto';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { UserPickedUpItemDto } from './dtos/user.pickedup.item.dto';
import * as jwt from 'jsonwebtoken';
import { ShoppingListItem } from 'src/shopping-list-item/shopping-list-item.model';
import { ShoppingListRepository } from 'src/shopping-list/shopping-list.repository';
import { ShoppingListItemsRepository } from 'src/shopping-list-item/shopping-list-item.repository';
const secret = 'secpass';

@Injectable()
export class UserService {
  private listCount = 0;
  constructor(
    private readonly userRepository: UserRepository,
    private readonly shoppingListRepository: ShoppingListRepository,
    private readonly shoppingListItemsRepository: ShoppingListItemsRepository,
  ) {}

  async createUser({ name, email }: CreateUserDto): Promise<User> {
    const newUser = <UserEntity>{ name, email };
    const user = await this.userRepository.createUser(newUser);
    return user;
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.getUserById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  async getUserLists(token: string) {
    const user = await this.verifyUser(token);

    const userShoppingLists =
      await this.shoppingListRepository.getShoppingLists(null, user.id);
    return userShoppingLists;
  }

  async getUserPickedUpItems(token: string) {
    const user = await this.verifyUser(token);

    const userPickedUpItems =
      await this.shoppingListItemsRepository.getShoppingListItems(user.id);
    return userPickedUpItems;
  }

  async pickUpItem(token: string, dto: UserPickedUpItemDto[]): Promise<any> {
    const user = await this.verifyUser(token);

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
    const user = await this.verifyUser(token);

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

  private async verifyUser(token: string): Promise<User> {
    try {
      const userId = (jwt.verify(token.split(' ')[1], secret) as any).user;
      const user = await this.userRepository.getUserById(userId);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}

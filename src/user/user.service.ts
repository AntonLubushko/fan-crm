import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto } from './dtos/create.user.dto';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { Item } from 'src/item/item.model';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser({ name, email }: CreateUserDto): Promise<User> {
    const newUser = <UserEntity>{ name, email };
    const user = await this.userRepository.createUser(newUser);
    return user;
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.getUserById(id);
  }

  async getAllUsers(): Promise<User[]> {
    await Item.create({ name: 'Tomato', price: 5.0 });
    await Item.create({ name: 'Salad', price: 2.5 });
    return this.userRepository.getAllUsers();
  }
}

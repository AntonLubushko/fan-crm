import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto } from './dtos/create.user.dto';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser({ name, email, phone }: CreateUserDto): Promise<User> {
    const newUser = <UserEntity>{ name, email, phone };
    const user = await this.userRepository.createUser(newUser);
    return user;
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.getUserById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }
}

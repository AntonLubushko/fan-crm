import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create.user.dto';

import { UserEntity } from '../../user/user.entity';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AdminUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser({ name, email }: CreateUserDto): Promise<UserEntity> {
    const newUser = <UserEntity>{ name, email };
    const user = await this.userRepository.createUser(newUser);
    return user;
  }

  async getUserById(id: number): Promise<UserEntity> {
    return this.userRepository.getUserById(id);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.getAllUsers();
  }
}

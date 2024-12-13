import { Injectable } from '@nestjs/common';
import { User } from '../../user/user.model';
import { CreateUserDto } from './dtos/create.user.dto';
import { AdminUserRepository } from './admin.user.repository';
import { UserEntity } from '../../user/user.entity';

@Injectable()
export class AdminUserService {
  constructor(private readonly adminUserRepository: AdminUserRepository) {}

  async createUser({ name, email }: CreateUserDto): Promise<User> {
    const newUser = <UserEntity>{ name, email };
    const user = await this.adminUserRepository.createUser(newUser);
    return user;
  }

  async getUserById(id: number): Promise<User> {
    return this.adminUserRepository.getUserById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.adminUserRepository.getAllUsers();
  }
}

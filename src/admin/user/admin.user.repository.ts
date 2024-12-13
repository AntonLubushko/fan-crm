import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../user/user.model';
import { UserEntity } from '../../user/user.entity';

@Injectable()
export class AdminUserRepository {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async createUser(user: UserEntity): Promise<User> {
    const newUser = await this.userModel.create(user);
    return newUser.save();
  }

  async getUserById(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.findAll();
  }
}

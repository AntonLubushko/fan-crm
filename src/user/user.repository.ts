import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserEntity } from './user.entity';
import { UserPickedUpItemDto } from './dtos/user.pickedup.item.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async createUser(user: UserEntity) {
    const newUser = await this.userModel.create(user);
    return newUser.save();
  }

  async getUserById(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async pickUpItem(userId: number, dto: UserPickedUpItemDto[]): Promise<any> {
    return dto;
  }
}

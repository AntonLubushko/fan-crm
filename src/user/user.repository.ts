import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserEntity } from './user.entity';
import { User } from './user.model';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async createUser(userEntity: UserEntity): Promise<UserEntity> {
    const userModel = await this.userModel.create({
      name: userEntity.name,
      email: userEntity.email,
    });

    return new UserEntity(userModel);
  }

  async getUserById(id: number): Promise<UserEntity> {
    const userModel = await this.userModel.findByPk(id);

    if (!userModel) {
      return null;
    }

    return new UserEntity(userModel);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    const usersModels = await this.userModel.findAll();

    if (!usersModels) {
      return [];
    }

    return usersModels.map((userModel) => new UserEntity(userModel));
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dtos/create.user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async createUser({ name, email, phone }: CreateUserDto): Promise<User> {
    const user = await this.userModel.create({ name, email, phone });
    return user;
  }

  async getUserById(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.findAll();
  }
}

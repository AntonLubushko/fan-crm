import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserPickedUpItemDto } from './dtos/user.pickedup.item.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async pickUpItem(userId: number, dto: UserPickedUpItemDto[]): Promise<any> {
    return dto;
  }
}

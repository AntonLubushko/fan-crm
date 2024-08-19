import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import * as jwt from "jsonwebtoken";

const secret = "secpass";

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async createUser(
    token: string,
    name: string,
    email: string,
    phone: string,
  ): Promise<User> {
    verifyToken(token);

    const user = await this.userModel.create({ name, email, phone });
    console.log(user);
    return user;
  }

  async getUserById(token: string, id: number): Promise<User> {
    verifyToken(token);
    return this.userModel.findByPk(id);
  }
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secret);
    const expired = decoded["expire"];

    if (!expired || !Number(expired)) {
      throw new HttpException("Expire date absent", HttpStatus.UNAUTHORIZED);
    }

    if (Number(expired) < Date.now() / 1000) {
      throw new HttpException("Expired token", HttpStatus.UNAUTHORIZED);
    }
  } catch (err) {
    throw new HttpException(err, HttpStatus.UNAUTHORIZED);
  }
}

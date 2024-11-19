import { IUser } from 'libs/interfaces/src';

export class UserEntity implements IUser {
  id: number;
  email: string;
  name: string;

  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
  }

  getPublicProfile() {
    return {
      email: this.email,
      name: this.name,
    };
  }

  updateProfile(newName: string) {
    this.name = newName;
    return this;
  }
}

import { IUser } from 'libs/interfaces/src';

export class UserEntity implements IUser {
  _id?: string;
  email: string;
  phone: string;
  name?: string;

  constructor(user: IUser) {
    this._id = user._id;
    this.email = user.email;
    this.phone = user.phone;
    this.name = user.name;
  }

  public getPublicProfile() {
    return {
      email: this.email,
      name: this.name,
      phone: this.phone,
    };
  }

  public updateProfile(newName: string) {
    this.name = newName;
    return this;
  }
}

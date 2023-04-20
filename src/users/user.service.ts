import { Injectable } from '@nestjs/common';
import { usersMock } from 'src/__mocks__/users';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private users: Array<User> = usersMock;

  public create(user: User): User {
    this.users.push(user);

    return user;
  }

  public searchUserName(name: string) {
    this.users.find((user) => user.name == name);

    return this.users;
  }
}

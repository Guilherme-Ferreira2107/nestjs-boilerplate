import { User } from 'src/users/user.entity';

export const usersMock: Array<User> = [
  {
    id: 1,
    name: 'guilherme',
    email: 'gui@gmail.com',
    password: '123456',
    completeName: 'gui santos',
    createdDate: new Date(),
  },
];

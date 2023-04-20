import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':name')
  public searchUserName(@Param('name') name: string) {
    const userFounded = this.userService.searchUserName(name);
    return userFounded;
  }

  @Post()
  public create(@Body() user: User) {
    throw new Error('error guilherme');
    const userCreated = this.userService.create(user);

    return userCreated;
  }
}

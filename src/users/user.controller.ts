import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':name')
  public searchUserName(@Param('name') name: string) {
    const userFounded = this.userService.searchUserName(name);

    if (!userFounded) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Usuário não econtrado',
      });
    }
    return userFounded;
  }

  @Post()
  public create(@Body() user: User): NestResponse {
    const userCreated = this.userService.create(user);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({
        Location: `/users/${userCreated.name}`,
      })
      .withBody(userCreated)
      .build();
  }
}

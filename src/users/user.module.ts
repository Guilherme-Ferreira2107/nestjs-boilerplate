import { Module } from '@nestjs/common';
import { IsNameUniqueConstraint } from './is-name-unique.validator';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, IsNameUniqueConstraint],
})
export class UserModule {}

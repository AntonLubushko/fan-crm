import { Body, Controller, Get, Param, Post, Headers } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/v1')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('add-user')
  createUser(
    @Body() body: { name: string; email: string; phone: string },
    @Headers('Authorization') auth: string,
  ) {
    return this.userService.createUser(auth, body.name, body.email, body.phone);
  }

  @Get('get-user/:id')
  getUser(@Param('id') id: string, @Headers('Authorization') auth: string) {
    return this.userService.getUserById(auth, Number(id));
  }
}

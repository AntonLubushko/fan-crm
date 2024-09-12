import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/v1')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('add-user')
  @UseGuards(JwtAuthGuard)
  createUser(@Body() body: { name: string; email: string; phone: string }) {
    return this.userService.createUser(body.name, body.email, body.phone);
  }

  @Get('get-user/:id')
  @UseGuards(JwtAuthGuard)
  getUser(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }

  @Get('get-users')
  @UseGuards(JwtAuthGuard)
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}

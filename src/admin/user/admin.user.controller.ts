import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AdminUserService } from './admin.user.service';
import { JwtAdminAuthGuard } from '../../auth/jwt-admin-auth.guard';
import { CreateUserDto } from '../dtos/create.user.dto';

@Controller('api/admin')
export class AdminUserController {
  constructor(private adminUserService: AdminUserService) {}

  @Post('add-user')
  @UseGuards(JwtAdminAuthGuard)
  createUser(@Body() dto: CreateUserDto) {
    return this.adminUserService.createUser(dto);
  }

  @Get('get-user/:id')
  @UseGuards(JwtAdminAuthGuard)
  getUser(@Param('id') id: string) {
    return this.adminUserService.getUserById(Number(id));
  }

  @Get('get-users')
  @UseGuards(JwtAdminAuthGuard)
  getAllUsers() {
    return this.adminUserService.getAllUsers();
  }
}

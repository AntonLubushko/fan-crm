import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAdminAuthGuard } from '../../auth/jwt-admin-auth.guard';
import { CreateItemDto } from '../dtos/create.item.dto';
import { AdminItemService } from './admin.item.service';

@Controller('api/admin')
export class AdminItemController {
  constructor(private adminItemService: AdminItemService) {}

  @Post('add-item')
  @UseGuards(JwtAdminAuthGuard)
  createItem(@Body() dto: CreateItemDto) {
    return this.adminItemService.createItem(dto);
  }

  @Get('get-items')
  @UseGuards(JwtAdminAuthGuard)
  showAllItems() {
    return this.adminItemService.getAllItems();
  }
}

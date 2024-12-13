import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserPickedUpItemDto } from './dtos/user.pickedup.item.dto';
import { JwtUserAuthGuard } from 'src/auth/jwt-user-auth.guard';

@Controller('api/user')
export class UserShoppingController {
  constructor(private userService: UserService) {}

  @Get('show-lists')
  @UseGuards(JwtUserAuthGuard)
  getLists(@Headers('authorization') token: string) {
    return this.userService.getUserLists(token);
  }

  @Get('show-pickedup-items')
  @UseGuards(JwtUserAuthGuard)
  getPickedUpItems(@Headers('authorization') token: string) {
    return this.userService.getUserPickedUpItems(token);
  }

  @Post('pickup-items')
  @UseGuards(JwtUserAuthGuard)
  pickupItems(
    @Headers('authorization') token: string,
    @Body() dto: UserPickedUpItemDto[],
  ) {
    return this.userService.pickUpItem(token, dto);
  }

  @Delete('delete-list/:id')
  @UseGuards(JwtUserAuthGuard)
  deleteList(
    @Headers('authorization') token: string,
    @Param('id', ParseIntPipe) listId: number,
  ) {
    return this.userService.deleteList(token, listId);
  }
}

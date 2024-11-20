import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UserPickedUpItemDto {
  @IsNumber()
  itemId: number;

  @IsNumber()
  quantity: number;
}

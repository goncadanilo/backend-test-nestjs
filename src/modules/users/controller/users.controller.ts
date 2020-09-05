import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { StoreUserDto } from '../dtos/store-user.dto';
import { UsersService } from '../service/users.service';

@Controller('v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async store(@Body() data: StoreUserDto) {
    const createdUserId = await this.usersService.store(data);

    return { id: createdUserId };
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptService } from '../../shared/services/bcrypt.service';
import { Users } from './entity/users.entity';
import { UsersService } from './service/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [],
  providers: [UsersService, BcryptService],
})
export class UsersModule {}

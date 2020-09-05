import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreUserDto } from '../dtos/store-user.dto';
import { Users } from '../entity/users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private repository: Repository<Users>) {}

  async store(data: StoreUserDto): Promise<number> {
    const userAlreadyExists = await this.repository.findOne(data.email);

    if (userAlreadyExists) {
      throw new BadRequestException('User with same email already exists');
    }

    const { id } = await this.repository.save(data);
    this.repository.findOne();

    return id;
  }
}

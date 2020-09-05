import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BcryptService } from '../../../shared/services/bcrypt.service';
import { StoreUserDto } from '../dtos/store-user.dto';
import { Users } from '../entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private repository: Repository<Users>,
    private bcrypt: BcryptService,
  ) {}

  async store(data: StoreUserDto): Promise<number> {
    const userAlreadyExists = await this.repository.findOne({
      email: data.email,
    });

    if (userAlreadyExists) {
      throw new BadRequestException('User with same email already exists');
    }

    data.password = await this.bcrypt.hash(data.password);
    const { id } = await this.repository.save(data);

    return id;
  }

  async findByEmail(email: string): Promise<Users> {
    return await this.repository.findOne({ email });
  }
}

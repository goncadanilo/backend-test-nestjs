import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'aftersale-backend-test',
      entities: [resolve(__dirname, 'modules', '**', 'entity', '*{.ts,.js}')],
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}

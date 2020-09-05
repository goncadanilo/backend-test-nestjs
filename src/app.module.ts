import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';

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
  ],
})
export class AppModule {}

module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'aftersale-backend-test',
  entities: ['src/modules/**/entity/*{.ts,.js}'],
  migrations: ['src/shared/infra/typeorm/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/shared/infra/typeorm/migrations',
  },
};

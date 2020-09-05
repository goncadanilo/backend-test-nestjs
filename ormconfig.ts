module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'aftersale-backend-test',
  entities: ['src/modules/**/entity/*{.ts,.js}'],
  migrations: ['src/shared/infra/database/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/shared/infra/database/migrations',
  },
};

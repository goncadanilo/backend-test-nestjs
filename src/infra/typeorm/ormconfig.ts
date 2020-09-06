module.exports = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['src/modules/**/entity/*{.ts,.js}'],
  migrations: ['src/infra/typeorm/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/infra/typeorm/migrations',
  },
};

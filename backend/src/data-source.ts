import { DataSource } from 'typeorm'
import { normalizePort } from './server-utils'

const mysqlDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST ?? 'localhost',
  port: normalizePort(process.env.MYSQL_PORT, 3306),
  username: process.env.MYSQL_USERNAME ?? 'dev',
  password: process.env.MYSQL_PASSWORD ?? 'dev@pwd',
  database: 'wapdb-db',
  entities: ['src/entity/*.ts'],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'data_migrations',
  logging: ['warn', 'error'],
  logger: 'file'
})

const sqliteDataSource = new DataSource({
  type: 'sqlite',
  database: 'wapdb-db',
  entities: ['src/entity/*.ts'],
  migrations: ['src/migrations/*.ts'],
  logging: false,
  synchronize: true
})

export { mysqlDataSource, sqliteDataSource }

import { DataSource } from 'typeorm'

const mysqlDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'test',
  password: 'test',
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

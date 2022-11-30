import { DataSourceOptions } from 'typeorm'
import { normalizePositiveDecimalValue, normalizeStringValue } from './server-utils'
import dotenv from 'dotenv-flow'

if (process.env.RUN_DOTENV != null) {
  dotenv.config()
}

export const getDatasourceConfig = (): DataSourceOptions => {
  return process.env.NODE_ENV !== 'test'
    ? {
        type: 'mysql',
        host: normalizeStringValue(process.env.MYSQL_HOST, '127.0.0.1'),
        port: normalizePositiveDecimalValue(process.env.MYSQL_PORT, 3306),
        username: normalizeStringValue(process.env.MYSQL_USERNAME, 'dev'),
        password: normalizeStringValue(process.env.MYSQL_PASSWORD, 'dev@local'),
        database: normalizeStringValue(process.env.MYSQL_DATABASE_NAME, 'wapdb-db'),
        entities: [`src/entity/*.${process.env.NODE_ENV === 'dev' ? 'ts' : 'js'}`],
        migrations: [`src/migration/*.${process.env.NODE_ENV === 'dev' ? 'ts' : 'js'}`],
        migrationsTableName: 'data_migrations',
        logging: ['warn', 'error'],
        logger: 'file'
      }
    : {
        type: 'sqlite',
        database: 'wapdb-db',
        entities: ['src/entity/*.ts'],
        migrations: ['src/migration/*.ts'],
        logging: false,
        synchronize: true
      }
}

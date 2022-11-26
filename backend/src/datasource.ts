/* eslint-disable import/first */
import dotenv from 'dotenv-flow'
if (process.env.LOAD_DOTENV != null) {
  dotenv.config() // Need to be here in the middle of imports to properly initialize
}
import { DataSource } from 'typeorm'
import { getDatasourceConfig } from './datasource.config'

const datasource = new DataSource(getDatasourceConfig())
export default datasource

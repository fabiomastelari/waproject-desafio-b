import express from 'express'
import { mysqlDataSource, sqliteDataSource } from './data-source'
import ApiRouter from './router'

const dataSource = process.env.NODE_ENV === 'test' ? sqliteDataSource : mysqlDataSource
// establish database connection
dataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

// create and setup express app
const app = express()
app.use('/', ApiRouter)

export default app

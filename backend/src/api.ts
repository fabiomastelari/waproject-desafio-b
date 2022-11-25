import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { expressjwt, GetVerificationKey } from 'express-jwt'
import jwksRsa from 'jwks-rsa'
import helmet from 'helmet'
import morgan from 'morgan'
import { mysqlDataSource, sqliteDataSource } from './data-source'
import ApiRouter from './router'
import { getAuth0CriptAlgorithm } from './server-utils'

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
const api = express()

api.use(helmet()) // To enhance API's security

api.use(cors()) // To enable CORS for all requests

api.use(morgan('combined')) // To include logging of HTTP requests

api.use(bodyParser.json()) // To parse JSON bodies into JS objects

if (process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  const jwtCheck = expressjwt({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${process.env.AUTH0_ISSUER_URI as string}.well-known/jwks.json`
    }) as GetVerificationKey,
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_ISSUER_URI,
    algorithms: [getAuth0CriptAlgorithm(process.env.AUTH0_ALGORITHM, 'RS256')]
  })

  api.use(jwtCheck)// eslint-disable-line @typescript-eslint/no-misused-promises
}

api.use('/', ApiRouter)

export default api

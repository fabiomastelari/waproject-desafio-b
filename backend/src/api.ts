import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { expressjwt, GetVerificationKey } from 'express-jwt'
import jwksRsa from 'jwks-rsa'
import helmet from 'helmet'
import morgan from 'morgan'
import { getAuth0CriptAlgorithm } from './server-utils'
import datasource from './datasource'
import { RegisterRoutes } from './routes/routes'
import swaggerUi from 'swagger-ui-express'

// establish database connection
datasource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

// create and setup express app
const api = express()

api.use(express.static('public'))

api.use(helmet()) // To enhance API's security

api.use(cors()) // To enable CORS for all requests

api.use(morgan('combined')) // To include logging of HTTP requests

api.use(bodyParser.json()) // To parse JSON bodies into JS objects

if (process.env.NODE_ENV !== 'test' && process.env.DISABLE_AUTH0 !== '1') {
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
  }).unless({ path: ['/docs'] })

  api.use(jwtCheck)// eslint-disable-line @typescript-eslint/no-misused-promises
}

RegisterRoutes(api)

api.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json'
    }
  })
)

export default api

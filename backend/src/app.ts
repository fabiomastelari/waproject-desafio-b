import api from './api'
import * as dotenv from 'dotenv'
import { normalizePort } from './server-utils'

dotenv.config()

const port = normalizePort(process.env.API_PORT, 3000)

api.listen(port, function () {
  console.log(`app listening on port ${port}`)
})

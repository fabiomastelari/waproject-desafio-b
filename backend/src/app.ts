/* eslint-disable import/first */
import dotenv from 'dotenv-flow'
dotenv.config() // Need to be here in the middle of imports to properly initialize
import api from './api'
import { normalizePort } from './server-utils'

const port = normalizePort(process.env.API_PORT, 3000)

api.listen(port, function () {
  console.log(`app listening on port ${port}`)
})

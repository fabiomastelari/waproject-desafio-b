/* eslint-disable import/first */
import dotenv from 'dotenv-flow'
dotenv.config() // Need to be here in the middle of imports to properly initialize
import 'reflect-metadata'
import api from './api'
import { normalizePositiveDecimalValue } from './server-utils'

const port = normalizePositiveDecimalValue(process.env.API_PORT, 3000)

api.listen(port, function () {
  console.log(`app listening on port ${port}`)
})

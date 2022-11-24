import app from './app'
import { normalizePort } from './server-utils'

const port = normalizePort(process.env.API_PORT, 3000)

app.listen(port, function () {
  console.log(`app listening on port ${port}`)
})

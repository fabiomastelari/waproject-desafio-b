import app from './app'

const port = normalizePort(process.env.PORT, 3000)

function normalizePort (portValue: number | string | undefined, defaultPortValue: number): number {
  let normalizedPort: number = defaultPortValue
  if (typeof portValue === 'number') {
    if (portValue >= 0) {
      normalizedPort = portValue
    }
  } else if (typeof portValue !== 'undefined') {
    const parsedPortValue = parseInt(portValue, 10)
    if (!isNaN(parsedPortValue)) {
      normalizedPort = parsedPortValue
    }
  }
  return normalizedPort
}

app.listen(port, function () {
  console.log(`app listening on port ${port}`)
})

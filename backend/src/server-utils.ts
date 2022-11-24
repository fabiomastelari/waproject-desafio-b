export function normalizePort (portValue: number | string | undefined, defaultPortValue: number): number {
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

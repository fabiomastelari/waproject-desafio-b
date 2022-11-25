import { Algorithm as JWTAlgorithm } from 'jsonwebtoken';
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

export function getAuth0CriptAlgorithm (algorithmValue: string | undefined, defaultAlgorithmValue: JWTAlgorithm): JWTAlgorithm {
  switch (algorithmValue) {
    case 'HS256':
    case 'HS384':
    case 'HS512':
    case 'RS256':
    case 'RS384':
    case 'RS512':
    case 'ES256':
    case 'ES384':
    case 'ES512':
    case 'PS256':
    case 'PS384':
    case 'PS512':
    case 'none':
      return algorithmValue
    default:
      return defaultAlgorithmValue
  }
}

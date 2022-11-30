import { Algorithm as JWTAlgorithm } from 'jsonwebtoken'

export function normalizePositiveDecimalValue (decimalPositiveValue: number | string | undefined, defaultDecimalPositiveValue: number): number {
  let normalizedPositiveDecimalValue: number = defaultDecimalPositiveValue
  if (typeof decimalPositiveValue === 'number') {
    if (decimalPositiveValue >= 0) {
      normalizedPositiveDecimalValue = decimalPositiveValue
    }
  } else if (typeof decimalPositiveValue !== 'undefined') {
    const parsedPositiveDecimalValue = parseInt(decimalPositiveValue, 10)
    if (!isNaN(parsedPositiveDecimalValue)) {
      normalizedPositiveDecimalValue = parsedPositiveDecimalValue
    }
  }
  return normalizedPositiveDecimalValue
}

export function normalizeStringValue (stringValue: string | undefined, defaultStringValue: string): string {
  return stringValue !== undefined ? stringValue : defaultStringValue
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

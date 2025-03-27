import moment from 'moment'

export function getAgeFromDate(date: string) {
  return moment().diff(date, 'years', false)
}

export const maskPhone = (value: string, prefix = '+') => {
  const matches = value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)
  const country = (matches && matches[1]) || ''
  const code = (matches && matches[2]) || ''
  const number1 = (matches && matches[3]) || ''
  const number2 = (matches && matches[4]) || ''
  const number3 = (matches && matches[5]) || ''

  const masked = `${prefix}${country} (${code}) ${number1}-${number2}-${number3}`

  return masked
}

export const unmaskPhoneNumber = (phone: string) => {
  return phone.replace(/\D+/g, '')
}

// https://github.com/apollographql/apollo-feature-requests/issues/6#issuecomment-465305186
export const stripTypenames = (obj: Record<string, unknown>, propToDelete: string) => {
  for (const property in obj) {
    if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
      delete obj.property
      const newData = stripTypenames(obj[property] as Record<string, unknown>, propToDelete)
      obj[property] = newData
    } else {
      if (property === propToDelete) {
        delete obj[property]
      }
    }
  }

  return obj
}

export const pluralize = (value: number, one: string, two: string, five: string): string => {
  let n = Math.abs(value)
  n %= 100
  if (n >= 5 && n <= 20) {
    return `${value} ${five}`
  }
  n %= 10
  if (n === 1) {
    return `${value} ${one}`
  }
  if (n >= 2 && n < 5) {
    return `${value} ${two}`
  }

  return `${value} ${five}`
}

export function stringToColor(string: string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

export function stringAvatar(name: string) {
  const names = name.toUpperCase().split(' ')
  return {
    color: stringToColor(name),
    children: `${names[0][0]}${names?.[1] ? names[1][0] : names[0][1].toLowerCase()}`,
  }
}

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(num)
}

export const formatCurrencyBRL = (num: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(num)
}

export const cleanCurrencyValue = (value: string): number => {
  const rawValue = value.split(',')[0].replace(/[^\d]/g, '')
  return parseInt(rawValue, 10) || 0
}

export const formatKilometers = (value: number): string => {
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value)

  return `${formattedValue} km`
}

export function formatPhoneNumber(phone: string): string {
  phone = phone.replace(/\D/g, '')

  let countryCode = ''
  if (phone.startsWith('55') && phone.length > 11) {
    countryCode = '+55 '
    phone = phone.slice(2)
  }

  if (phone.length === 11) {
    return `${countryCode}(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`
  } else if (phone.length === 10) {
    return `${countryCode}(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6)}`
  }

  return countryCode + phone
}

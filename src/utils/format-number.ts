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

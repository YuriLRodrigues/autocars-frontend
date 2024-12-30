export const convertZipCodeToNumber = (zipCode: string): number => {
  return Number(zipCode.replace(/\D/g, ''))
}

export const abbreviateTime = (distance: string) => {
  const abbreviations: { [key: string]: string } = {
    ano: 'a',
    anos: 'a',
    mes: 'm',
    meses: 'm',
    semana: 'sem',
    semanas: 'sem',
    dia: 'd',
    dias: 'd',
    hora: 'h',
    horas: 'h',
    minuto: 'min',
    minutos: 'min',
    segundo: 's',
    segundos: 's',
  }

  const isApproximate = distance.includes('cerca de')

  const cleanDistance = isApproximate ? distance.replace('cerca de ', '') : distance

  const abbreviated = Object.entries(abbreviations).reduce((acc, [full, short]) => {
    return acc.replace(new RegExp(`\\b${full}\\b`, 'gi'), short)
  }, cleanDistance)

  return abbreviated
}

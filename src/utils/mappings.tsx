import { ReactNode } from 'react'

import { Badge } from '@/components/ui/badge'

export const mappingThemeMode: Record<string, string> = {
  dark: 'Escuro',
  light: 'Claro',
  system: 'Sistema',
}

export const mappingMonthReference: Record<number, string> = {
  1: 'Janeiro',
  2: 'Fevereiro',
  3: 'Março',
  4: 'Abril',
  5: 'Maio',
  6: 'Junho',
  7: 'Julho',
  8: 'Agosto',
  9: 'Setembro',
  10: 'Outubro',
  11: 'Novembro',
  12: 'Dezembro',
}

export const mappingBorderBeamColors: Record<string, Record<string, string>> = {
  red: {
    light: '#ff4d4d',
    dark: '#b30000',
  },
  orange: {
    light: '#ff9f00',
    dark: '#cc7a00',
  },
  green: {
    light: '#2ed573',
    dark: '#1c9e56',
  },
  rose: {
    light: '#ff2e96',
    dark: '#b70072',
  },
  blue: {
    light: '#3498db',
    dark: '#1e7bb9',
  },
  yellow: {
    light: '#f1c40f',
    dark: '#c29c0a',
  },
  violet: {
    light: '#9b59b6',
    dark: '#7a4280',
  },
  neutral: {
    light: '#b8b8b8',
    dark: '#8c8c8c',
  },
  zinc: {
    light: '#f4f4f4',
    dark: '#101010',
  },
  stone: {
    light: '#d7b19d',
    dark: '#9e7c6d',
  },
  gray: {
    light: '#808080',
    dark: '#505050',
  },
  slate: {
    light: '#3b4f5c',
    dark: '#2a3d47',
  },
}

export const mappingAdSoldStatus: Record<'Sold' | 'Active' | 'Reserved', ReactNode> = {
  Active: (
    <div className="flex items-center justify-center gap-3">
      <Badge variant="success" className="h-3.5 w-3.5 animate-pulse rounded-full px-0 py-0" />
      <p>Diponível</p>
    </div>
  ),
  Sold: (
    <div className="flex items-center justify-center gap-3">
      <Badge variant="danger" className="h-3.5 w-3.5 animate-pulse rounded-full px-0 py-0" />
      <p>Vendido</p>
    </div>
  ),
  Reserved: (
    <div className="flex items-center justify-center gap-3">
      <Badge variant="alert" className="h-3.5 w-3.5 animate-pulse rounded-full px-0 py-0" />
      <p>Reservado</p>
    </div>
  ),
}

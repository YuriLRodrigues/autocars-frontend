import { ReactNode } from 'react'

import { Badge } from '@/components/ui/badge'

import { Capacity, Color, Doors, Fuel, GearBox, Model } from '@/@types/advertisement'
import { UserRoles } from '@/@types/user'

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

export const mappingUserRoles: Record<UserRoles, string> = {
  Manager: 'Administrador',
  Customer: 'Comprador',
  Seller: 'Vendedor',
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

export const mappingStepsLabel: Record<'SIGNUP' | 'ADDRESS' | 'SEND-IMAGES' | 'AD-DATA' | 'AD-DETAILS', string> = {
  SIGNUP: 'Cadastro',
  ADDRESS: 'Endereço',
  'SEND-IMAGES': 'Enviar fotos',
  'AD-DATA': 'Informações do anúncio',
  'AD-DETAILS': 'Detalhes do anúncio',
}

export const mappingModel: Record<Model, string> = {
  [Model.SUV]: 'SUV',
  [Model.Sedan]: 'Sedan',
  [Model.Hatch]: 'Hatch',
  [Model.Pickups]: 'Picapes',
  [Model.Crossover]: 'Crossover',
  [Model.Stilt]: 'Carro alto',
  [Model.Minivan]: 'Minivan',
  [Model.Sport]: 'Esportivo',
  [Model.Van]: 'Van',
  [Model.Coupe]: 'Cupê',
}

export const mappingGearBox: Record<GearBox, string> = {
  [GearBox.Automatic]: 'Automático',
  [GearBox.Manual]: 'Manual',
}

export const mappingFuel: Record<Fuel, string> = {
  [Fuel.Gasoline]: 'Gasolina',
  [Fuel.Flex]: 'Flex',
  [Fuel.Ethanol]: 'Etanol',
  [Fuel.Diesel]: 'Diesel',
  [Fuel.GNV]: 'GNV',
  [Fuel.Eletric]: 'Elétrico',
}

export const mappingCapacity: Record<Capacity, string> = {
  [Capacity.Two]: 'Duas pessoas',
  [Capacity.Four]: 'Quatro pessoas',
  [Capacity.Five]: 'Cinco pessoas',
  [Capacity.Six]: 'Seis pessoas',
}

export const mappingDoors: Record<Doors, string> = {
  [Doors.Two]: 'Duas portas',
  [Doors.Three]: 'Três portas',
  [Doors.Four]: 'Quatro portas',
}

export const mappingNumberOfCapacity: Record<Capacity, string> = {
  [Capacity.Two]: '2',
  [Capacity.Four]: '4',
  [Capacity.Five]: '5',
  [Capacity.Six]: '6',
}

export const mappingNumberOfDoors: Record<Doors, string> = {
  [Doors.Two]: '2',
  [Doors.Three]: '3',
  [Doors.Four]: '4',
}

export const mappingColor: Record<Color, React.ReactNode> = {
  [Color.Red]: (
    <div className="flex items-center gap-2">
      <span className="h-4 w-4 rounded-full bg-[#EF4444]" /> Vermelho
    </div>
  ),
  [Color.Black]: (
    <div className="flex items-center gap-2">
      <span className="h-4 w-4 rounded-full bg-[#000000]" /> Preto
    </div>
  ),
  [Color.Green]: (
    <div className="flex items-center gap-2">
      <span className="h-4 w-4 rounded-full bg-[#22C55E]" /> Verde
    </div>
  ),
  [Color.Silver]: (
    <div className="flex items-center gap-2">
      <span className="h-4 w-4 rounded-full bg-[#D1D5DB]" /> Prata
    </div>
  ),
  [Color.White]: (
    <div className="flex items-center gap-2">
      <span className="h-4 w-4 rounded-full border bg-[#FFFFFF]" /> Branco
    </div>
  ),
  [Color.Blue]: (
    <div className="flex items-center gap-2">
      <span className="h-4 w-4 rounded-full bg-[#3B82F6]" /> Azul
    </div>
  ),
  [Color.Gray]: (
    <div className="flex items-center gap-2">
      <span className="h-4 w-4 rounded-full bg-[#6B7280]" /> Cinza
    </div>
  ),
  [Color.Yellow]: (
    <div className="flex items-center gap-2">
      <span className="h-4 w-4 rounded-full bg-[#EAB308]" /> Amarelo
    </div>
  ),
  [Color.Orange]: (
    <div className="flex items-center gap-2">
      <span className="h-4 w-4 rounded-full bg-[#F97316]" /> Laranja
    </div>
  ),
  [Color.Metalic]: (
    <div className="flex items-center gap-2">
      <span className="h-4 w-4 rounded-full bg-[#9CA3AF]" /> Metálico
    </div>
  ),
  [Color.Pink]: (
    <div className="flex items-center gap-2">
      <span className="h-4 w-4 rounded-full bg-[#EC4899]" /> Rosa
    </div>
  ),
  [Color.Purple]: (
    <div className="flex items-center gap-2">
      <span className="h-4 w-4 rounded-full bg-[#A855F7]" /> Roxo
    </div>
  ),
  [Color.Brown]: (
    <div className="flex items-center gap-2">
      <span className="h-4 w-4 rounded-full bg-[#78350F]" /> Marrom
    </div>
  ),
}

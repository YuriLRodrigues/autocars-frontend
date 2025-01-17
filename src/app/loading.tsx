import Image from 'next/image'

import AutoCarsLogo from '../assets/images/autocars.svg'

export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <Image src={AutoCarsLogo} width={50} height={50} alt="logo-autocars" className="animate-spin" />
      <p>Autocars - Carregando...</p>
    </div>
  )
}

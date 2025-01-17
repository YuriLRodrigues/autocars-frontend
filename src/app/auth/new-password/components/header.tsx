import Image from 'next/image'

import AutoCarsLogo from '@/assets/images/autocars.svg'

export default function Header() {
  return (
    <section className="mb-3 space-y-2 text-center">
      <div className="flex items-center justify-center gap-3">
        <Image src={AutoCarsLogo} alt="Auto Cars Logo" className="h-auto w-12" />
        <h2 className="text-lg font-bold text-primary">Auto Cars</h2>
      </div>
      <h1 className="text-3xl font-extrabold">Alterar a senha</h1>
      <p className="max-w-2xl">
        Atualize a sua senha para garantir a confidencialidade dos dados de sua conta. Seus dados não serão divulgados.
      </p>
    </section>
  )
}

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import AutoCarsLogo from '../../../../assets/images/autocars.svg'

export default function Header() {
  return (
    <section className="mb-3 space-y-2 text-center">
      <div className="flex items-center justify-center gap-3">
        <Image src={AutoCarsLogo} alt="Auto Cars Logo" className="h-auto w-12" />
        <h2 className="text-lg font-bold text-primary">Auto Cars</h2>
      </div>
      <h1 className="text-3xl font-extrabold">Crie sua conta</h1>
      <span>
        Já tem uma conta?
        <Button asChild effect="underline" variant="link">
          <Link href="/auth/sign-in" className="pl-2 font-bold text-primary hover:underline">
            Entre nela por aqui!
          </Link>
        </Button>
      </span>
    </section>
  )
}

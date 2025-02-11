import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="max-w-md text-center">
        <Icon name="Car" className="mx-auto size-32 text-primary" />
        <h1 className="mb-2 text-4xl font-bold">404 - Página não encontrada</h1>
        <p className="mb-6 text-foreground/70">Opa! Parece que você acelerou demais e saiu da pista.</p>
        <Button effect="ringHover" asChild className="rounded-lg bg-primary px-6 py-3 text-white shadow-md transition">
          <Link href="/">Voltar para a página inicial</Link>
        </Button>
      </div>
    </div>
  )
}

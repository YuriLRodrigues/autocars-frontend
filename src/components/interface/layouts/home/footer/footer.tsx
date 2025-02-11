import Image from 'next/image'

import { Separator } from '@/components/ui/separator'

import AutoCarsLogo from '@/assets/images/autocars.svg'

export const Footer = () => {
  const currentYear = new Date().getUTCFullYear()

  return (
    <footer className="flex flex-wrap items-center justify-center gap-3 border-t border-primary-foreground p-5 py-3 text-center dark:border-primary-foreground/40">
      <div className="flex w-fit flex-wrap items-center justify-center gap-3 p-3">
        <Image src={AutoCarsLogo} alt="Auto Cars Logo" className="h-auto w-8" width={80} height={80} />
        <p>© {currentYear} - Todos os direitos reservados a Auto Cars.</p>
      </div>
      <Separator orientation="horizontal" className="bg-foreground md:hidden" />
      <Separator orientation="vertical" className="hidden h-10 bg-foreground md:block" />
      <ul className="flex w-fit items-center justify-center gap-4">
        <li className="cursor-pointer duration-300 hover:underline">Sobre</li>
        <li className="cursor-pointer duration-300 hover:underline">Contato</li>
        <li className="cursor-pointer duration-300 hover:underline">Política de privacidade</li>
      </ul>
    </footer>
  )
}

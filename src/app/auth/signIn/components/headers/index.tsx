import Image from 'next/image'

import logo from '../../../../../assets/images/turbo.svg'
export default function Header() {
  return (
    <>
      <div className="mb-4 flex items-center justify-center gap-3">
        <Image src={logo} alt="Auto Cars Logo" className="h-auto w-12" />
        <h2 className="text-lg font-bold text-orange-500">Auto Cars</h2>
      </div>
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900">Crie sua conta</h1>
      <p className="text-gray-600">
        Já tem uma conta?
        <a href="/login" className="pl-2 font-bold text-orange-500 hover:underline">
          Entre nela por aqui!
        </a>
      </p>
    </>
  )
}

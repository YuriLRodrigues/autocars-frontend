import type { Metadata } from 'next'
import { Poppins, Raleway } from 'next/font/google'

import '@/styles/globals.css'
import '@/styles/themes.css'

import { Providers } from '@/providers'

export const poppinsFont = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '800'],
  subsets: ['latin'],
})

export const ralewayFont = Raleway({
  weight: ['100', '200', '300', '400', '500', '600', '800'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Auto Cars',
  description: 'Auto Cars Application',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${ralewayFont.className} relative antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

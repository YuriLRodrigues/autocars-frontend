import Image from 'next/image'

import { ForgotPasswordForm } from './components/form'
import Header from './components/header'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function ForgotPasswordPage() {
  return (
    <main className="grid h-screen max-h-screen items-center justify-center overflow-hidden">
      <Image
        src="/assets/forgot-password.jpg"
        width={1920}
        height={1080}
        alt="forgot-password-image"
        className="absolute z-10 h-screen max-h-screen bg-no-repeat object-cover object-center opacity-70"
      />
      <div className="fixed z-20 flex h-fit min-h-full w-full flex-col items-center justify-center rounded-xl bg-white/30 px-8 py-3 backdrop-blur-md dark:bg-black/60 sm:min-h-0 md:static md:flex">
        <div className="grid w-[100vw] px-1 sm:w-full">
          <ScrollArea
            className="max-h-[calc(100vh-25px)] w-full max-w-[100vw] flex-1 px-0 sm:max-w-full md:px-3"
            type="scroll"
            scrollHideDelay={550}
          >
            <Header />
            <ForgotPasswordForm />
          </ScrollArea>
        </div>
      </div>
    </main>
  )
}

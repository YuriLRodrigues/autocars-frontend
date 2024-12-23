import Image from 'next/image'

import { SignUpForm } from './components/form'
import Header from './components/header'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function SignUpPage() {
  return (
    <main className="grid h-screen max-h-screen items-center justify-center overflow-hidden md:grid-cols-2">
      <div className="fixed flex min-h-full w-full flex-col items-center justify-center bg-white/30 px-8 py-3 backdrop-blur-md dark:bg-black/60 md:static md:flex">
        <div className="grid w-[100vw] px-2 sm:w-full">
          <ScrollArea
            className="max-h-[calc(100vh-25px)] w-full max-w-[100vw] flex-1 px-0 sm:max-w-full md:px-3"
            type="scroll"
            scrollHideDelay={550}
          >
            <Header />
            <SignUpForm />
          </ScrollArea>
        </div>
      </div>
      <Image
        src="/assets/sign-up.jpg"
        alt="Sign-Up-Image-Form"
        className="h-full w-full object-cover object-center md:block"
        width={1920}
        height={1080}
      />
    </main>
  )
}

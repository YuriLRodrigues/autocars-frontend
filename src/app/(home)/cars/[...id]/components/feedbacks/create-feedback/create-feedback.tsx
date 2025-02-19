'use client'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Icon } from '@/components/ui/icon'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'

import { CreateFeedbackForm } from './form '

export const CreateFeedback = () => {
  return (
    <>
      <div className="hidden sm:flex">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="flex items-center gap-2" effect="shine" icon={<Icon name="Plus" />} iconPlacement="left">
              Adicionar um comentário
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] max-w-2xl">
            <ScrollArea className="max-h-screen w-full pr-3">
              <CreateFeedbackForm />
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>

      <Drawer>
        <DrawerTrigger className="flex sm:hidden" asChild>
          <Button className="flex items-center gap-2" effect="shine" icon={<Icon name="Plus" />} iconPlacement="left">
            Adicionar um comentário
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Adicionar um comentário</DrawerTitle>
            <DrawerDescription>
              Utilize esta área para adicionar um novo comentário ao anúncio. Ao preencher todos os campos, clique no
              botão &quot;Enviar&quot; para publicá-lo.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="max-h-[calc(100vh-100px)] w-full">
            <div className="grid">
              <ScrollArea className="max-h-[calc(100vh-180px)] w-full pr-3">
                <CreateFeedbackForm />
              </ScrollArea>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

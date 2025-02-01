import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import { ScrollArea } from '@/components/ui/scroll-area'

import { CreateAdvertisementForm } from './form'

export const CreateAdvertisement = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild className="hidden sm:flex">
          <Button className="flex items-center gap-2" effect="shine" icon={<Icon name="Plus" />} iconPlacement="left">
            Criar anúncio
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[calc(100vh-100px)] w-full max-w-3xl">
          <DialogHeader>
            <DialogTitle>Criar anúncio</DialogTitle>
            <DialogDescription>
              Preencha os detalhes necessários para criar e publicar seu anúncio na plataforma.
            </DialogDescription>
          </DialogHeader>

          <div className="grid">
            <ScrollArea className="max-h-[calc(100vh-190px)] w-full pr-3">
              <CreateAdvertisementForm />
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      <Drawer>
        <DrawerTrigger asChild className="block sm:hidden">
          <Button className="flex items-center gap-2" effect="shine" icon={<Icon name="Plus" />} iconPlacement="left">
            Criar anúncio
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Criar anúncio</DrawerTitle>
            <DrawerDescription>
              Preencha os detalhes necessários para criar e publicar seu anúncio na plataforma.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="max-h-[calc(100vh-100px)] w-full">
            <div className="grid">
              <ScrollArea className="max-h-[calc(100vh-180px)] w-full pr-3">
                <CreateAdvertisementForm />
              </ScrollArea>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

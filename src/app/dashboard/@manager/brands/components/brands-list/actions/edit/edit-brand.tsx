import { ReactNode } from 'react'

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

type EditBrandProps = {
  children: ReactNode
}

export const EditBrand = ({ children }: EditBrandProps) => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild className="hidden sm:flex">
          <Button className="flex h-auto items-center gap-2 p-1" variant="secondary" effect="shine">
            <Icon name="Pencil" className="size-4 flex-none" />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="right" sideOffset={10} className="min-w-full max-w-[600px] dark:shadow-foreground/5">
          <div className="grid">
            <ScrollArea className="max-h-[330px] w-full">{children}</ScrollArea>
          </div>
        </PopoverContent>
      </Popover>

      <Drawer>
        <DrawerTrigger asChild className="block sm:hidden">
          <Button className="flex h-auto items-center gap-2 p-1" variant="secondary" effect="shine">
            <Icon name="Pencil" className="size-4 flex-none" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Atualizar marca</DrawerTitle>
            <DrawerDescription>
              Edite as informações da marca para melhorar a visualização dos anúncios.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="max-h-[calc(100vh-100px)] w-full">
            <div className="grid">
              <ScrollArea className="max-h-[calc(100vh-180px)] w-full pr-3">{children}</ScrollArea>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

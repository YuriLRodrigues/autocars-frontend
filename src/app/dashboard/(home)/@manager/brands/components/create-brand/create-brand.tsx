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

import { CreateBrandForm } from './form/form'

export const CreateBrand = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild className="hidden sm:flex">
          <Button className="flex items-center gap-2" effect="shine" icon={<Icon name="Plus" />} iconPlacement="left">
            Criar
          </Button>
        </PopoverTrigger>
        <PopoverContent side="right" sideOffset={10} className="min-w-full max-w-[600px] dark:shadow-foreground/5">
          <div className="grid">
            <ScrollArea className="max-h-[330px] w-full">
              <CreateBrandForm />
            </ScrollArea>
          </div>
        </PopoverContent>
      </Popover>

      <Drawer>
        <DrawerTrigger asChild className="block sm:hidden">
          <Button className="flex items-center gap-2" effect="shine" icon={<Icon name="Plus" />} iconPlacement="left">
            Criar
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Criar marca</DrawerTitle>
            <DrawerDescription>
              Adicione uma nova marca para facilitar a organização dos seus anúncios. Adicione nomes concisos e siga as
              regras de nomes recomendadas pela Comissão de Marcas.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="max-h-[calc(100vh-100px)] w-full">
            <div className="grid">
              <ScrollArea className="max-h-[calc(100vh-180px)] w-full pr-3">
                <CreateBrandForm />
              </ScrollArea>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

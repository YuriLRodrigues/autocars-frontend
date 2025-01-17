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

import { FilterAdvertisementsForm } from './form/form'

export const FilterAdvertisements = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild className="hidden sm:flex">
          <Button className="flex items-center gap-2" effect="shine" icon={<Icon name="Filter" />} iconPlacement="left">
            Filtrar
          </Button>
        </PopoverTrigger>
        <PopoverContent side="right" sideOffset={10} className="w-full max-w-[380px] dark:shadow-foreground/5">
          <div className="grid">
            <ScrollArea className="max-h-[330px] w-full">
              <FilterAdvertisementsForm />
            </ScrollArea>
          </div>
        </PopoverContent>
      </Popover>

      <Drawer>
        <DrawerTrigger asChild className="block sm:hidden">
          <Button className="flex items-center gap-2" effect="shine" icon={<Icon name="Filter" />} iconPlacement="left">
            Filtrar
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Filtrar anúncios</DrawerTitle>
            <DrawerDescription>Selecione os filtros para encontrar os anúncios desejados.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="max-h-[calc(100vh-100px)] w-full">
            <div className="grid">
              <ScrollArea className="max-h-[calc(100vh-180px)] w-full pr-3">
                <FilterAdvertisementsForm />
              </ScrollArea>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

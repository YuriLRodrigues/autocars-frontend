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
import { ScrollArea } from '@/components/ui/scroll-area'

import { FilterAdvertisementsForm, FilterAdvertisementsFormSkeleton } from './form/form'

export const FilterAdvertisements = () => {
  return (
    <>
      <div className="hidden max-h-screen min-w-fit rounded-md border p-1 py-2 md:grid">
        <ScrollArea className="max-h-screen w-full pr-3">
          <FilterAdvertisementsForm />
        </ScrollArea>
      </div>

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

export const FilterAdvertisementsSkeleton = () => {
  return (
    <>
      <div className="hidden max-h-screen min-w-fit rounded-md border p-1 py-2 md:grid">
        <ScrollArea className="max-h-screen w-full pr-3">
          <FilterAdvertisementsFormSkeleton />
        </ScrollArea>
      </div>

      <div className="block sm:hidden">
        <Button className="flex items-center gap-2" effect="shine" icon={<Icon name="Filter" />} iconPlacement="left">
          Filtrar
        </Button>
      </div>
    </>
  )
}

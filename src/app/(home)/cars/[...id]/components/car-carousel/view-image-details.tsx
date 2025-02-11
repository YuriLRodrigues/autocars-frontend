import { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Icon } from '@/components/ui/icon'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

type ViewImageFullscreenDialogProps = {
  children: ReactNode
}

export const ViewImageFullscreenDialog = ({ children }: ViewImageFullscreenDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          effect="ringHover"
          className="absolute right-3 top-3 z-10 h-auto w-auto rounded-full bg-primary/80 p-2 text-primary-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-primary hover:shadow-xl"
        >
          <Icon name="Maximize2" className="size-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="z-[9999] flex max-h-screen w-screen max-w-7xl flex-col overflow-hidden border-none bg-background/95 p-0 backdrop-blur-md sm:max-h-[95vh]">
        <DialogHeader className="relative z-50 border-b bg-background/80 p-4 backdrop-blur-sm">
          <DialogTitle>Visualização ampliada</DialogTitle>
          <DialogDescription>
            Visualize a imagem em tela cheia. Caso ela não esteja totalmente visível, deslize para ver a parte restante.
          </DialogDescription>
          <DialogClose asChild>
            <Button
              type="button"
              effect="ringHover"
              className="absolute right-3 top-0 h-auto w-auto rounded-full bg-primary/10 !px-2 !py-2 text-primary hover:bg-primary/20"
            >
              <Icon name="X" className="size-5" />
            </Button>
          </DialogClose>
        </DialogHeader>

        {/* Fullscreen Carousel */}
        <div className="grid">
          <ScrollArea className="max-h-[75vh] w-full px-3">
            <div className="overflow-hidden">
              <div className="flex">
                <div className="min-w-full">{children}</div>
              </div>
            </div>
            <ScrollBar orientation="vertical" />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}

import Image from 'next/image'
import { ComponentProps, SetStateAction } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EmptyCard } from '@/components/ui/empty-card'
import { Icon } from '@/components/ui/icon'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { cn } from '@/lib/utils'
import { toast } from 'sonner'

type UploadedFilesCardProps = ComponentProps<'div'> & {
  uploadedFiles: Array<{ id: string; url: string }>
  setThumbnailId: React.Dispatch<SetStateAction<string | undefined>>
  setRemovedImagesIds: React.Dispatch<SetStateAction<string[]>>
  thumbnailImageId?: string | undefined
}

export function UploadedFilesCard({
  uploadedFiles,
  setThumbnailId,
  thumbnailImageId,
  setRemovedImagesIds,
  className,
}: UploadedFilesCardProps) {
  const handleDeleteImage = (id: string) => {
    setRemovedImagesIds((prevState) => {
      if (!prevState?.includes(id)) {
        return [...(prevState || []), id]
      }
      return prevState
    })

    if (id === thumbnailImageId) {
      setThumbnailId(uploadedFiles.find((file) => file.id !== id)?.id || undefined)
    }
    toast.success('Imagem escolhida para deleção, para salvar avance a etapa e salve a edição')
  }

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Imagens enviadas</CardTitle>
        <CardDescription>
          Veja os arquivos carregados aqui e selecione uma imagem como thumbnail (capa) do anúncio
        </CardDescription>
      </CardHeader>
      <CardContent className="grid">
        {uploadedFiles.length > 0 ? (
          <ScrollArea className="pb-4">
            <RadioGroup className="flex w-max space-x-2.5" defaultValue={thumbnailImageId}>
              {uploadedFiles.map((file) => (
                <div key={file.id} className="relative aspect-video w-64">
                  <div className="absolute left-0 top-3 z-20 flex w-full items-center justify-between px-2">
                    <div className="flex items-center gap-2 rounded-md bg-white/50 p-2 dark:bg-black/50">
                      <RadioGroupItem
                        value={file.id}
                        id={file.id}
                        onClick={() => setThumbnailId(file.id)}
                        checked={file.id === thumbnailImageId}
                      />
                      <Label htmlFor={file.id}>Thumbnail</Label>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-md bg-red-500 p-2 hover:bg-red-700"
                      onClick={() => handleDeleteImage(file.id)}
                    >
                      <Icon name="Trash" className="h-4 w-4" />
                      <span className="sr-only">Delete image</span>
                    </Button>
                  </div>
                  <Image
                    src={file.url}
                    alt={file.id}
                    fill
                    sizes="(min-width: 640px) 640px, 100vw"
                    loading="lazy"
                    className="rounded-md object-cover"
                  />
                </div>
              ))}
            </RadioGroup>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <EmptyCard
            title="Nenhum arquivo foi carregado"
            description="Carregue alguns arquivos para vê-los aqui"
            className="w-full"
          />
        )}
      </CardContent>
    </Card>
  )
}

import Image from 'next/image'
import { ComponentProps, SetStateAction } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EmptyCard } from '@/components/ui/empty-card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'

import { Upload } from '@/http/orval-generation/schemas'
import { cn } from '@/lib/utils'

interface UploadedFilesCardProps extends ComponentProps<'div'> {
  uploadedFiles: Upload[]
  setThumbnailImageId: React.Dispatch<SetStateAction<string | undefined>>
  thumbnailImageId: string | undefined
}

export function UploadedFilesCard({
  uploadedFiles,
  setThumbnailImageId,
  thumbnailImageId,
  className,
}: UploadedFilesCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Imagens enviadas</CardTitle>
        <CardDescription>
          Veja os arquivos carregados aqui e selecione uma imagem como thumbnail (capa) do anúncio
        </CardDescription>
      </CardHeader>
      <CardContent>
        {uploadedFiles.length > 0 ? (
          <ScrollArea className="pb-4">
            <RadioGroup className="flex w-max space-x-2.5" defaultValue={thumbnailImageId}>
              {uploadedFiles.map((file) => (
                <div key={file.id} className="relative aspect-video w-64">
                  <div className="absolute left-3 top-3 z-20 flex items-center space-x-2 rounded-md bg-white/50 p-2 dark:bg-black/50">
                    <RadioGroupItem value={file.id} id={file.id} onClick={() => setThumbnailImageId(file.id)} />
                    <Label htmlFor={file.id}>Thumbnail</Label>
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

export function UploadedFilesCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Imagens enviadas</CardTitle>
        <CardDescription>
          Veja os arquivos carregados aqui e selecione uma imagem como thumbnail (capa) do anúncio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid">
          <ScrollArea className="max-w-full pb-4">
            <div className="flex w-max space-x-2.5">
              {[...Array(15)].map((_, index) => (
                <div key={index} className="relative aspect-video w-64">
                  <Skeleton className="size-full rounded-md" />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}

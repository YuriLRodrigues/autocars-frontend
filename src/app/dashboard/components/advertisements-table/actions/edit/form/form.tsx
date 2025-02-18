'use client'

import Image from 'next/image'
import { useEffect } from 'react'

import { UploadedFilesCardSkeleton } from '@/app/dashboard/components/create-advertisement/form/upload-files-card'
import { Steps } from '@/components/interface/form/steps'
import { FileUploader } from '@/components/interface/upload/file-uploader'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { VisibleChieldComponent } from '@/components/ui/visible-chield-component'

import { Capacity, Color, Doors, Fuel, GearBox, Model } from '@/@types/advertisement'
import { useFindAllBrands } from '@/http/orval-generation/routes/brand-controller/brand-controller'
import { MAX_FILE_SIZE, MAX_FILE_UPLOADED } from '@/utils/constants'
import { formatCurrencyBRL, formatKilometers } from '@/utils/format-number'
import {
  mappingCapacity,
  mappingColor,
  mappingDoors,
  mappingFuel,
  mappingGearBox,
  mappingModel,
} from '@/utils/mappings'

import { formSteps } from './schema'
import { UploadedFilesCard } from './upload-files-card'
import { useEditAdvertisementsForm } from './use-edit-advertisements'
import { useUploadFile } from './use-upload-images'

type EditAdvertisementFormProps = {
  advertisementId: string
}

export const EditAdvertisementForm = ({ advertisementId }: EditAdvertisementFormProps) => {
  const { data, isLoading } = useFindAllBrands({ limit: 1000 }, { query: { queryKey: ['findAllBrands'] } })

  const { isUploading, onUpload, uploadedFiles, progresses } = useUploadFile()

  const {
    form,
    isSubmitting,
    handleSubmit,
    progressByStep,
    thumbnailImageId,
    setThumbnailImageId,
    isAdDataStep,
    isImagesStep,
    validateStepFields,
    allImagesByAdvertisement,
    setRemovedImagesIds,
  } = useEditAdvertisementsForm({
    uploadedFiles: uploadedFiles ?? [],
    advertisementId,
  })

  useEffect(() => {
    if (uploadedFiles) {
      const imageIds = uploadedFiles.map((img) => img.id)
      form.setValue('newImagesIds', imageIds)
    }
    if (thumbnailImageId) {
      form.setValue('thumbnailImageId', thumbnailImageId)
    }
    return
  }, [uploadedFiles, form, thumbnailImageId])

  if (isLoading) return <EditAdvertisementFormSkeleton />

  return (
    <Form {...form}>
      <Steps currentStep={form.getValues('step')} progress={progressByStep} steps={formSteps} />
      <form onSubmit={handleSubmit} className="grid gap-x-3 gap-y-3 p-1 sm:grid-cols-2">
        {/* STEP 1  */}

        <VisibleChieldComponent visible={isImagesStep}>
          <div className="flex flex-col gap-6 md:col-span-2">
            <FileUploader
              multiple={true}
              maxFileCount={MAX_FILE_UPLOADED - allImagesByAdvertisement.length}
              maxSize={MAX_FILE_SIZE}
              progresses={progresses}
              onUpload={onUpload}
              disabled={isUploading || MAX_FILE_UPLOADED - allImagesByAdvertisement.length === 0}
            />
            <UploadedFilesCard
              uploadedFiles={allImagesByAdvertisement ?? []}
              setThumbnailId={setThumbnailImageId}
              setRemovedImagesIds={setRemovedImagesIds}
              thumbnailImageId={thumbnailImageId}
            />
          </div>
        </VisibleChieldComponent>

        {/* STEP 2  */}
        <VisibleChieldComponent visible={isAdDataStep}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input autoComplete="off" type="text" placeholder="Título" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Descrição" className="h-10 min-h-20 resize-y sm:min-h-10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brandId"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Marca" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-40">
                    {data?.results?.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        <span className="flex flex-row items-center gap-3">
                          <Image
                            src={brand.logoUrl}
                            alt={`logo-${brand.name}`}
                            width={100}
                            height={100}
                            className="size-7 rounded-full object-cover object-center"
                          />
                          <span>{brand.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Modelo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-40">
                    {Object.entries(Model).map(([, value]) => (
                      <SelectItem key={value} value={value} className="flex items-center gap-3">
                        {mappingModel[value]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gearBox"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Câmbio" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-40">
                    {Object.entries(GearBox).map(([, value]) => (
                      <SelectItem key={value} value={value} className="flex items-center gap-3">
                        {mappingGearBox[value]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fuel"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Combustível" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-40">
                    {Object.entries(Fuel).map(([, value]) => (
                      <SelectItem key={value} value={value} className="flex items-center gap-3">
                        {mappingFuel[value]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Cor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-40">
                    {Object.entries(Color).map(([, value]) => (
                      <SelectItem key={value} value={value} className="flex items-center gap-3">
                        {mappingColor[value]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="doors"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Portas" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-40">
                    {Object.entries(Doors).map(([, value]) => (
                      <SelectItem key={value} value={value} className="flex items-center gap-3">
                        {mappingDoors[value]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Capacidade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-40">
                    {Object.entries(Capacity).map(([, value]) => (
                      <SelectItem key={value} value={value} className="flex items-center gap-3">
                        {mappingCapacity[value]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="km"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="Quilometragem"
                    type="text"
                    {...field}
                    value={field.value ? formatKilometers(field.value) : ''}
                    onChange={(e) => {
                      const input = e.target
                      const rawValue = input.value.replace(/[^\d]/g, '')
                      const numericValue = parseInt(rawValue, 10) || 0
                      field.onChange(numericValue)
                      setTimeout(() => {
                        const length = input.value.length
                        input.setSelectionRange(length, length - 3)
                      }, 0)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="Ano"
                    type="text"
                    {...field}
                    value={field.value ? field.value : ''}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^\d]/g, '')
                      const numericValue = parseInt(rawValue, 10) || 0
                      if (numericValue > new Date().getFullYear() + 1) {
                        field.onChange(new Date().getFullYear() + 1)
                      } else {
                        field.onChange(numericValue)
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="Preço"
                    type="text"
                    {...field}
                    value={field.value ? formatCurrencyBRL(field.value) : ''}
                    onChange={(e) => {
                      const input = e.target
                      const rawValue = input.value.split(',')[0].replace(/[^\d]/g, '')
                      const numericValue = parseInt(rawValue, 10) || 0

                      field.onChange(numericValue)

                      setTimeout(() => {
                        const length = input.value.length
                        input.setSelectionRange(length, length - 3)
                      }, 0)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PhoneInput
                    defaultCountry="BR"
                    autoComplete="off"
                    placeholder="Telefone para contato"
                    max={13}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="localization"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input autoComplete="off" type="text" placeholder="Localização do veículo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </VisibleChieldComponent>

        <div className="flex flex-wrap items-center justify-end gap-4 p-4 md:col-span-2">
          {isAdDataStep && (
            <Button
              variant="outline"
              type="button"
              icon={<Icon name="ArrowLeft" />}
              effect="ringHover"
              className="h-8"
              iconPlacement="left"
              onClick={() => form.setValue('step', 'SEND-IMAGES')}
            >
              Voltar para o passo anterior
            </Button>
          )}

          {isImagesStep && (
            <Button
              type="button"
              icon={<Icon name="Check" />}
              iconPlacement="right"
              effect="shine"
              className="h-8"
              onClick={() => form.setValue('step', 'AD-DATA')}
              disabled={isUploading || allImagesByAdvertisement.length === 0 || !validateStepFields('SEND-IMAGES')}
            >
              Próximo passo
            </Button>
          )}

          {isAdDataStep && (
            <Button
              type="submit"
              icon={<Icon name="Check" />}
              iconPlacement="right"
              effect="shine"
              className="h-8"
              disabled={isSubmitting || !validateStepFields('AD-DATA')}
            >
              Salvar anúncio
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}

export const EditAdvertisementFormSkeleton = () => {
  return (
    <section className="space-y-6">
      <div className="w-full rounded-lg border-2 border-dashed p-0.5">
        <div className="group relative h-full min-h-48 cursor-pointer rounded-lg bg-secondary outline-dashed outline-transparent transition-all duration-300 hover:outline-primary">
          <div className="flex h-48 flex-col items-center justify-center gap-y-3">
            <Icon name="Upload" className="h-10 w-10 transition-all duration-300 group-hover:scale-110" />
            <div className="flex flex-col items-center justify-center gap-y-2">
              <Skeleton className="h-3 w-72 sm:w-96" />
              <Skeleton className="h-3 w-32 sm:w-60" />
            </div>
          </div>
        </div>
      </div>
      <UploadedFilesCardSkeleton />
    </section>
  )
}

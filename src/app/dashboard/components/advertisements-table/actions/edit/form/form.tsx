'use client'

import Image from 'next/image'
import { useEffect } from 'react'

import { Steps } from '@/components/interface/form/steps'
import { MinimalTiptapEditor } from '@/components/interface/minimal-tiptap'
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
import { Upload } from '@/http/orval-generation/schemas'
import { formatCurrencyBRL, formatKilometers } from '@/utils/format-number'
import {
  mappingCapacity,
  mappingColor,
  mappingDoors,
  mappingFuel,
  mappingGearBox,
  mappingModel,
} from '@/utils/mappings'

import { EditAdvertisementSchemaProps, formSteps } from './schema'
import { UploadedFilesCard } from './upload-files-card'
import { useEditAdvertisementsForm } from './use-edit-advertisements'
import { useUploadFile } from './use-upload-images'

type EditAdvertisementFormProps = {
  adId: string
  defaultValues?: Partial<EditAdvertisementSchemaProps>
  oldImages?: Upload[]
}

export const EditAdvertisementForm = ({ adId, defaultValues, oldImages }: EditAdvertisementFormProps) => {
  const { data, isLoading } = useFindAllBrands({}, { query: { queryKey: ['findAllBrands'] } })
  const { isUploading, onUpload, uploadedFiles, progresses } = useUploadFile()

  const {
    form,
    isSubmitting,
    handleSubmit,
    progressByStep,
    details,
    setDetails,
    thumbnailImageId,
    setThumbnailImageId,
    isAdDataStep,
    isAdDetailsStep,
    isImagesStep,
    validateStepFields,
  } = useEditAdvertisementsForm({ uploadedImagesIds: uploadedFiles?.map((img) => img.id) ?? [], defaultValues, adId })

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

  const uploadedImages = oldImages?.concat(uploadedFiles || [])

  return (
    <Form {...form}>
      <Steps currentStep={form.getValues('step')} progress={progressByStep} steps={formSteps} />
      <form onSubmit={handleSubmit} className="grid gap-x-3 gap-y-3 p-1 sm:grid-cols-2">
        {/* STEP 1  */}

        <VisibleChieldComponent visible={isImagesStep}>
          <div className="flex flex-col gap-6 md:col-span-2">
            <FileUploader
              multiple={true}
              maxFileCount={4}
              maxSize={4 * 1024 * 1024}
              progresses={progresses}
              onUpload={onUpload}
              disabled={isUploading}
            />
            <UploadedFilesCard uploadedFiles={uploadedImages ?? []} setThumbnailId={setThumbnailImageId} />
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
                  <Textarea placeholder="Descrição" className="h-10 min-h-10 resize-y" {...field} />
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

        {/* STEP 3  */}
        <VisibleChieldComponent visible={isAdDetailsStep}>
          <MinimalTiptapEditor
            immediatelyRender={false}
            value={details}
            onChange={setDetails}
            className="h-5 max-h-20 min-h-40 w-full md:col-span-2"
            editorContentClassName="p-5 "
            output="text"
            placeholder="Detalhes do carro..."
            autofocus={true}
            editable={true}
            editorClassName="focus:outline-none "
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

          {isAdDetailsStep && (
            <Button
              variant="outline"
              type="button"
              icon={<Icon name="ArrowLeft" />}
              effect="ringHover"
              className="h-8"
              iconPlacement="left"
              onClick={() => form.setValue('step', 'AD-DATA')}
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
              disabled={isUploading || !validateStepFields('SEND-IMAGES')}
            >
              Próximo passo
            </Button>
          )}

          {isAdDataStep && (
            <Button
              type="button"
              icon={<Icon name="Check" />}
              iconPlacement="right"
              effect="shine"
              className="h-8"
              onClick={() => form.setValue('step', 'AD-DETAILS')}
              disabled={isUploading || !validateStepFields('AD-DATA')}
            >
              Próximo passo
            </Button>
          )}

          {isAdDetailsStep && (
            <Button
              type="submit"
              icon={<Icon name="Check" />}
              iconPlacement="right"
              effect="shine"
              className="h-8"
              disabled={isSubmitting}
            >
              Criar anúncio
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}

export const EditAdvertisementFormSkeleton = () => {
  return (
    <form className="grid gap-x-3 gap-y-3 p-1 sm:grid-cols-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton className="h-10 w-full" key={i} />
      ))}
    </form>
  )
}

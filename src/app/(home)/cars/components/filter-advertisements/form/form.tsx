'use client'

import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Slider } from '@/components/ui/slider'

import { Color, Fuel, Model, SoldStatus } from '@/@types/advertisement'
import { useFindAllBrands } from '@/http/orval-generation/routes/brand-controller/brand-controller'
import { formatCurrencyBRL, formatKilometers } from '@/utils/format-number'
import { mappingAdStatus, mappingColor, mappingFuel, mappingModel } from '@/utils/mappings'

import { useFilterAdvertisementsForm } from './use-filter-advertisements'

export const FilterAdvertisementsForm = () => {
  const { data } = useFindAllBrands({ limit: 1000 })
  const {
    form,
    handleSubmit,
    price,
    setPrice,
    clear,
    km,
    setKm,
    setShowAllBrands,
    setShowAllFuels,
    setShowAllModels,
    setShowAllColors,
    showAllBrands,
    showAllFuels,
    showAllModels,
    showAllColors,
  } = useFilterAdvertisementsForm()

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-3 px-1">
        <span className="hidden font-semibold sm:block">Filtrar anúncios</span>

        <FormField
          control={form.control}
          name="createdAt"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup defaultValue={field.value?.toString()} onValueChange={field.onChange}>
                  <Separator />
                  <FormLabel>Data de criação</FormLabel>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="asc" id="asc" />
                    <FormLabel htmlFor="asc">Crescente</FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="desc" id="desc" />
                    <FormLabel htmlFor="desc">Decrescente</FormLabel>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="soldStatus"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup defaultValue={field.value?.toString()} onValueChange={field.onChange}>
                  <Separator />
                  <FormLabel>Tipo</FormLabel>
                  {Object.entries(SoldStatus).map(([, value]) => (
                    <div key={value} className="flex items-center space-x-2">
                      <RadioGroupItem value={value} id={value} />
                      <FormLabel htmlFor={value}>{mappingAdStatus[value]}</FormLabel>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fuel"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup defaultValue={field.value?.toString()} onValueChange={field.onChange}>
                  <Separator />
                  <FormLabel>Combustível</FormLabel>
                  {Object.entries(Fuel)
                    .slice(0, showAllFuels)
                    .map(([, value]) => (
                      <div key={value} className="flex items-center space-x-2">
                        <RadioGroupItem value={value} id={value} />
                        <FormLabel htmlFor={value}>{mappingFuel[value]}</FormLabel>
                      </div>
                    ))}
                  <Button
                    className="mt-2 w-fit"
                    size="sm"
                    variant="outline"
                    onClick={() => setShowAllFuels((prev) => (prev > 4 ? 4 : Object.entries(Fuel).length))}
                    type="button"
                  >
                    {showAllFuels > 4 ? 'Mostrar menos' : 'Mostrar todos'}
                  </Button>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup defaultValue={field.value?.toString()} onValueChange={field.onChange}>
                  <Separator />
                  <FormLabel>Modelo</FormLabel>
                  {Object.entries(Model)
                    .slice(0, showAllModels)
                    .map(([, value]) => (
                      <div key={value} className="flex items-center space-x-2">
                        <RadioGroupItem value={value} id={value} />
                        <FormLabel htmlFor={value}>{mappingModel[value]}</FormLabel>
                      </div>
                    ))}
                  <Button
                    className="mt-2 w-fit"
                    size="sm"
                    variant="outline"
                    onClick={() => setShowAllModels((prev) => (prev > 4 ? 4 : Object.entries(Model).length))}
                    type="button"
                  >
                    {showAllModels > 4 ? 'Mostrar menos' : 'Mostrar todos'}
                  </Button>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup defaultValue={field.value?.toString()} onValueChange={field.onChange}>
                  <Separator />
                  <FormLabel>Cor do veículo</FormLabel>
                  {Object.entries(Color)
                    .slice(0, showAllColors)
                    .map(([, value]) => (
                      <div key={value} className="flex items-center space-x-2">
                        <RadioGroupItem value={value} id={value} />
                        <FormLabel htmlFor={value}>{mappingColor[value]}</FormLabel>
                      </div>
                    ))}
                  <Button
                    className="mt-2 w-fit"
                    size="sm"
                    variant="outline"
                    onClick={() => setShowAllColors((prev) => (prev > 4 ? 4 : Object.entries(Color).length))}
                    type="button"
                  >
                    {showAllColors > 4 ? 'Mostrar menos' : 'Mostrar todos'}
                  </Button>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brandId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup defaultValue={field.value?.toString()} onValueChange={field.onChange}>
                  <Separator />
                  <FormLabel>Marcas</FormLabel>
                  {(showAllBrands > 4 ? data?.results : data?.results?.slice(0, 4))?.map((brand) => (
                    <div key={brand.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={brand.id} id={brand.id} />
                      <FormLabel htmlFor={brand.id}>
                        <span className="flex items-center gap-3">
                          <Image
                            src={brand.logoUrl}
                            alt={`logo-${brand.name}`}
                            width={100}
                            height={100}
                            className="size-7 rounded-full object-cover object-center"
                          />
                          <span>{brand.name}</span>
                        </span>
                      </FormLabel>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              {data?.results && data?.results?.length > 4 && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowAllBrands((prev) => (prev === 4 ? (data?.results?.length ?? 4) : 4))}
                  type="button"
                >
                  {showAllBrands === data?.results?.length ? 'Mostrar menos' : 'Mostrar todos'}
                </Button>
              )}
            </FormItem>
          )}
        />

        <div className="flex w-full flex-col gap-4 text-sm font-medium">
          <p>Preço máximo:</p>
          <Slider
            step={10000}
            min={0}
            max={1000000}
            defaultValue={price}
            onValueChange={(value) => {
              setPrice(value)
            }}
          />
          <span className="ml-auto">{formatCurrencyBRL(price[0])}</span>
        </div>

        <div className="flex w-full flex-col gap-4 text-sm font-medium">
          <p>Quilometragem máxima:</p>
          <Slider
            step={10000}
            min={0}
            max={1000000}
            defaultValue={km}
            onValueChange={(value) => {
              setKm(value)
            }}
          />
          <span className="ml-auto">{formatKilometers(km[0])}</span>
        </div>

        <div className="!mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button size="sm" className="w-fit max-w-full" variant="outline" type="button" onClick={clear}>
            <Icon name="X" className="mr-2 flex-none" />
            Limpar filtros
          </Button>
          <Button size="sm" className="w-fit max-w-full">
            <Icon name="Search" className="mr-2" />
            Filtrar resultados
          </Button>
        </div>
      </form>
    </Form>
  )
}

export const FilterAdvertisementsFormSkeleton = () => {
  return (
    <div className="space-y-3 px-1">
      <span className="hidden font-semibold sm:block">Filtrar anúncios</span>
      <div className="space-y-1">
        <Separator className="!mb-1" />
        <label className="text-sm">Data de criação</label>
        <div className="space-y-2">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="size-4 rounded-full border border-primary" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-1">
        <Separator className="!mb-1" />
        <label className="text-sm">Tipo</label>
        <div className="space-y-2">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="size-4 rounded-full border border-primary" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-1">
        <Separator className="!mb-1" />
        <label className="text-sm">Combustível</label>
        <div className="space-y-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="size-4 rounded-full border border-primary" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
        <Skeleton className="!mt-3 h-9 w-28" />
      </div>
      <div className="space-y-1">
        <Separator className="!mb-1" />
        <label className="text-sm">Modelo</label>
        <div className="space-y-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="size-4 rounded-full border border-primary" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
        <Skeleton className="!mt-3 h-9 w-28" />
      </div>
      <div className="space-y-1">
        <Separator className="!mb-1" />
        <label className="text-sm">Cor do veículo</label>
        <div>
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="size-4 rounded-full border border-primary" />
              <div className="flex items-center gap-3">
                <Skeleton className="size-6 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </div>
        <Skeleton className="!mt-3 h-9 w-28" />
      </div>
      <div className="space-y-1">
        <Separator className="!mb-1" />
        <label className="text-sm">Marcas</label>
        <div className="space-y-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="size-4 rounded-full border border-primary" />
              <div className="flex items-center gap-3">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </div>
        <Skeleton className="!mt-3 h-9 w-28" />
      </div>
      <div className="space-y-1">
        <label className="text-sm">Preço máximo</label>
        <div>
          <Skeleton className="h-3 w-[300px]" />
          <Skeleton className="!mt-3 ml-auto h-3 w-10" />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-sm">Quilometrragem máxima</label>
        <div>
          <Skeleton className="h-3 w-[300px]" />
          <Skeleton className="!mt-3 ml-auto h-3 w-10" />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Skeleton className="!mt-6 h-9 w-28" />
        <Skeleton className="!mt-6 h-9 w-28" />
      </div>
    </div>
  )
}

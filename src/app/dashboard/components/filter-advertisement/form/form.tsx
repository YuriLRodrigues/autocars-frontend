'use client'

import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { DatePickerWithRange } from '@/components/ui/date-range-picker'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

import { SoldStatus } from '@/@types/advertisement'
import { useFindAllBrands } from '@/http/orval-generation/routes/brand-controller/brand-controller'
import { formatCurrencyBRL } from '@/utils/format-number'

import { useFilterAdvertisementsForm } from './use-filter-advertisements'

export const FilterAdvertisementsForm = () => {
  const { data } = useFindAllBrands({ limit: 1000 })
  const { form, handleSubmit, date, setDate, price, setPrice, clear } = useFilterAdvertisementsForm()

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-3 px-1">
        <span className="hidden font-semibold sm:block">Filtrar anúncios</span>
        <DatePickerWithRange date={date} setDate={setDate} />
        <FormField
          control={form.control}
          name="soldStatus"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status da venda" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={SoldStatus.Active}>Disponível</SelectItem>
                  <SelectItem value={SoldStatus.Reserved}>Reservado</SelectItem>
                  <SelectItem value={SoldStatus.Sold}>Vendido</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="createdAt"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Ordem de exibição (criação)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="asc">Crescente</SelectItem>
                  <SelectItem value="desc">Decrescente</SelectItem>
                </SelectContent>
              </Select>
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

        <div className="flex w-full flex-col gap-4 text-sm font-medium">
          <p>Preço máximo: </p>
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

        <div className="!mt-6 grid grid-cols-2 gap-3">
          <Button size="sm" variant="outline" type="button" onClick={clear}>
            <Icon name="X" className="mr-2 flex-none" />
            Limpar filtros
          </Button>
          <Button size="sm">
            <Icon name="Search" className="mr-2" />
            Filtrar resultados
          </Button>
        </div>
      </form>
    </Form>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { DatePickerWithRange } from '@/components/ui/date-range-picker'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Icon } from '@/components/ui/icon'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

import { SoldStatus } from '@/@types/advertisement'
import { formatCurrencyBRL } from '@/utils/format-number'

import { useFilterAdvertisementsForm } from './use-filter-advertisements'

export const FilterAdvertisementsForm = () => {
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
                  <SelectItem value={SoldStatus.Active}>Ativo</SelectItem>
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
                    <SelectValue placeholder="Ordem de exibição" />
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

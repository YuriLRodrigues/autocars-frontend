'use client'

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { months } from './months'
import { useSelectreferenceDate } from './use-select-reference-month'

export const SelectMonthForm = () => {
  const { form, handleSubmit } = useSelectreferenceDate()

  return (
    <Form {...form}>
      <form className="absolute right-2 top-2 w-fit md:right-4 md:top-4">
        <FormField
          control={form.control}
          name="referenceDate"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(e) => {
                  field.onChange(e)
                  handleSubmit({
                    referenceDate: parseInt(e),
                  })
                }}
                defaultValue={field.value.toString() || ''}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o mês" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-40">
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

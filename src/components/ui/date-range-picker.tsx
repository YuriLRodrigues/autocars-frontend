'use client'

import * as React from 'react'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Icon } from './icon'

type DatePickerWithRangerProps = {
  date: DateRange | undefined
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
} & React.HTMLAttributes<HTMLDivElement>

export function DatePickerWithRange({ date, setDate, className }: DatePickerWithRangerProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn('justify-between gap-3 text-left font-normal', !date && 'text-muted-foreground')}
          >
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd 'de' MMM 'de' yyyy", { locale: ptBR })} -{' '}
                  {format(date.to, "dd 'de' MMM 'de' yyyy", { locale: ptBR })}
                </>
              ) : (
                format(date.from, "dd 'de' MMM 'de' yyyy", { locale: ptBR })
              )
            ) : (
              <span>Selecione uma data</span>
            )}
            <Icon name="CalendarDays" className="size-5 text-primary duration-200 hover:text-primary/70" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

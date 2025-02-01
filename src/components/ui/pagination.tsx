'use client'

import { useSearchParams } from '@/hooks/use-search-params'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

import { Button } from './button'

type PaginationProps = {
  page: number
  totalCount: number
  perPage: number
}

export const Pagination = ({ page, totalCount, perPage }: PaginationProps) => {
  const { pathname, createQueryString } = useSearchParams()

  const onPageChange = (page: number) => {
    window.location.replace(`${pathname}?${createQueryString('page', String(page + 1))}`)
  }

  const pages = Math.ceil(totalCount / perPage) || 1

  return (
    <div className="mt-auto flex items-center justify-between gap-y-2 max-sm:flex-col">
      <span className="text-sm text-muted-foreground max-sm:order-last max-sm:text-xs">
        Total de {totalCount} item(s)
      </span>
      <div className="flex items-center gap-6 max-sm:justify-between lg:gap-8">
        <div className="hidden text-sm font-medium sm:block">
          Página {page} de {pages}
        </div>
        <div className="text-sm font-medium sm:hidden">
          {page} de {pages}
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-8 w-8 p-0" onClick={() => onPageChange(0)} disabled={page === 0}>
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(page + 1)}
            disabled={pages <= page + 1}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Póxima página</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(pages - 1)}
            disabled={pages <= page + 1}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Ultima página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

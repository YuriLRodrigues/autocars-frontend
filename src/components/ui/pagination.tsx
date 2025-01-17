'use client'

import { useSearchParams } from '@/hooks/use-search-params'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

import { Button } from './button'

type PaginationProps = {
  pageIndex: number
  totalCount: number
  perPage: number
}

export const Pagination = ({ pageIndex, totalCount, perPage }: PaginationProps) => {
  const { pathname, createQueryString } = useSearchParams()

  const onPageChange = (pageIndex: number) => {
    window.location.replace(`${pathname}?${createQueryString('page', String(pageIndex + 1))}`)
  }

  const pages = Math.ceil(totalCount / perPage) || 1

  return (
    <div className="flex items-center justify-between gap-y-2 max-sm:flex-col">
      <span className="text-sm text-muted-foreground max-sm:order-last max-sm:text-xs">
        Total de {totalCount} item(s)
      </span>
      <div className="flex items-center gap-6 max-sm:justify-between lg:gap-8">
        <div className="hidden text-sm font-medium sm:block">
          Página {pageIndex + 1} de {pages}
        </div>
        <div className="text-sm font-medium sm:hidden">
          {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-8 w-8 p-0" onClick={() => onPageChange(0)} disabled={pageIndex === 0}>
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pages <= pageIndex + 1}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Póxima página</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(pages - 1)}
            disabled={pages <= pageIndex + 1}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Ultima página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

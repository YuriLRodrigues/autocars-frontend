'use client'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export const CustomBreadCrumb = () => {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((p, index) => {
          const fullPath = `/${paths.slice(0, index + 1).join('/')}`

          return (
            <Fragment key={p}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                <BreadcrumbLink href={fullPath} className="first-letter:uppercase">
                  {p}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

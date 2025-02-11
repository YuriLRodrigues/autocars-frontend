'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

import { Icon } from '@/components/ui/icon'

import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { useCopyToClipboard } from 'usehooks-ts'

interface HandleCopyProps {
  className?: string
}

export const HandleCopy = ({ className }: HandleCopyProps) => {
  const [, copyToClipboard] = useCopyToClipboard()
  const [isCopied, setIsCopied] = useState(false)
  const pathname = usePathname()
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(`${window.location.origin}${pathname}`)
    }
  }, [pathname])

  const handleCopy = async () => {
    const success = await copyToClipboard(currentUrl)
    if (success) {
      setIsCopied(true)
      toast.success('URL copiada para a área de transferência!')
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    } else {
      toast.error('Falha ao copiar a URL. Por favor, tente novamente.')
    }
  }

  return (
    <div
      onClick={handleCopy}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center rounded-full transition-all duration-300',
        className,
      )}
      style={{ backgroundColor: isCopied ? 'rgba(209, 250, 229, 0.8)' : 'rgba(229, 231, 235, 0.8)' }}
    >
      <Icon
        name={isCopied ? 'Check' : 'Copy'}
        className={cn('h-8 w-8 p-1.5', isCopied ? 'text-green-500' : 'text-gray-500')}
        fill={isCopied ? 'currentColor' : 'none'}
      />
    </div>
  )
}

'use client'

import { RefreshCw } from 'lucide-react'
import { useEffect } from 'react'

import { Button } from './button'

interface ErrorFallbackProps {
  error: Error & { digest?: string }
  reset: () => void
  title?: string
  description?: string
  actionLabel?: string
  children?: React.ReactNode
}

export function ErrorFallback({
  error,
  reset,
  title = "문제가 발생했습니다",
  description = "잠시 후 다시 시도해주세요",
  actionLabel = "다시 시도",
  children,
}: ErrorFallbackProps) {
  useEffect(() => {
    console.error('Error caught by ErrorFallback:', error)
  }, [error])

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-xl font-medium text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
      <Button onClick={reset} variant="default" className="flex items-center gap-2">
        <RefreshCw className="h-4 w-4" />
        {actionLabel}
      </Button>
      {children}
    </div>
  )
}
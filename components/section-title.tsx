import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function SectionTitle({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center text-center', className)}>
      <span className="h-px flex-1 bg-brand-border" />
      <h2 className="px-6 font-heading text-sm uppercase tracking-[0.3em] text-silver">
        {children}
      </h2>
      <span className="h-px flex-1 bg-brand-border" />
    </div>
  )
}

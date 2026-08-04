import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  selected?: boolean
}

export function Card({ children, className, hover, selected }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border bg-white/[0.03] p-4',
        selected
          ? 'border-violet-500/60 bg-violet-500/5'
          : 'border-white/8',
        hover &&
          'cursor-pointer transition-all duration-150 hover:border-white/15 hover:bg-white/[0.05]',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center justify-between mb-3', className)}>
      {children}
    </div>
  )
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h3 className={cn('text-sm font-medium text-white', className)}>
      {children}
    </h3>
  )
}
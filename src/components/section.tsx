import { cn } from '@/lib/utils'

type SectionProps = {
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({ className, children, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-24 py-space-2xl md:py-space-3xl lg:scroll-mt-32 lg:py-space-4xl motion-safe:animate-fade-slide-up motion-safe:duration-200 motion-safe:ease-out',
        className
      )}
    >
      {children}
    </section>
  )
}

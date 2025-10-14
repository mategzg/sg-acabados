'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'

export type FilterOption = {
  label: string
  value: string
}

export type FilterGroup = {
  id: string
  label: string
  options: FilterOption[]
  type?: 'single' | 'multi'
}

export function Filters({ groups }: { groups: FilterGroup[] }) {
  const router = useRouter()
  const pathname = usePathname() ?? '/'
  const searchParams = useSearchParams()

  const toggleValue = (id: string, value: string, type: 'single' | 'multi' = 'single') => {
    const params = new URLSearchParams(searchParams?.toString())

    if (type === 'single') {
      if (params.get(id) === value) {
        params.delete(id)
      } else {
        params.set(id, value)
      }
    } else {
      const current = new Set((params.get(id) ?? '').split(',').filter(Boolean))
      if (current.has(value)) {
        current.delete(value)
      } else {
        current.add(value)
      }
      if (current.size > 0) {
        params.set(id, Array.from(current).join(','))
      } else {
        params.delete(id)
      }
    }

    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname)
  }

  const isActive = (id: string, value: string) => {
    const raw = searchParams?.get(id)
    if (!raw) return false
    return raw.split(',').includes(value)
  }

  return (
    <div className="flex flex-wrap gap-4">
      {groups.map((group) => (
        <div key={group.id} className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{group.label}</span>
          <div className="flex flex-wrap gap-2">
            {group.options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={cn(
                  'rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.3em] transition',
                  isActive(group.id, option.value)
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'bg-white text-muted-foreground hover:bg-secondary/40'
                )}
                onClick={() => toggleValue(group.id, option.value, group.type)}
                aria-pressed={isActive(group.id, option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

